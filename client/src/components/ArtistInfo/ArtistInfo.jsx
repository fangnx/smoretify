/**
 * ArtistInfo.jsx
 *
 * @author nxxinf
 * @github https://github.com/fangnx
 * @created 2019-07-27 15:10:48
 * @last-modified 2019-08-04 01:41:30
 */

import React from 'react';
import { Image, Container, Header, Icon } from 'semantic-ui-react';
import './ArtistInfo.css';
import { getArtistInfoFromGenius } from '../../actions/geniusActions';

class ArtistInfo extends React.Component {
  constructor() {
    super();
    this.state = {
      name: 'Artist Name',
      altNames: [],
      artistMainImg:
        'https://images.genius.com/6bcd2bd1708eeae7282400f1e4be633f.600x600x1.jpg',
      summary: '',
      facebookUrl: '',
      twitterUrl: '',
      instagramUrl: ''
    };
  }

  async getArtistInfo() {
    await getArtistInfoFromGenius({ artistId: 21128 })
      .then(async res => {
        if (res.status === 200) {
          console.log(res);
          const rawDescription = res.data.description.dom.children;
          let pureTextDescription = '';
          // Note: Genius API returns string literal '?' for non-existing description.
          if (rawDescription.length > 0 && rawDescription.indexOf('?') === -1) {
            const flattenDom = arr => {
              const tempArr = arr
                .flat()
                .filter(node => !!node)
                .map(node => {
                  if (node.children) {
                    return node.children;
                  } else {
                    return node;
                  }
                });
              return tempArr.some(e => Array.isArray(e))
                ? flattenDom(tempArr)
                : tempArr;
            };
            pureTextDescription = flattenDom(rawDescription).reduce(
              (str0, str1) => str0 + ' ' + str1
            );
            await this.setState({
              name: res.data.name,
              altNames: res.data.alternate_names,
              artistMainImg: res.data.image_url,
              summary: pureTextDescription
            });
          }
        }
      })
      .catch(err => console.log(err));
  }

  directToSocialMedia() {}

  async componentWillMount() {
    await this.getArtistInfo();
  }

  render() {
    console.log(this.state);
    return (
      <div className="artistInfo-panel">
        <div className="topImage-wrapper">
          <Image src={this.state.artistMainImg} className="topImage" />
        </div>

        <Container className="artistInfo-container title">
          <Header as="h1" className="artistInfo-name">
            {this.state.name}
          </Header>
          <div className="socialMedia">
            <Icon name="facebook square" onClick={this.directToSocialMedia} />
            <Icon name="twitter square" />
            <Icon name="instagram" />
          </div>
        </Container>

        <Container className="artistInfo-container summary">
          <Header as="h3">Bio</Header>
          <div>{this.state.summary}</div>
        </Container>
      </div>
    );
  }
}

export default ArtistInfo;
