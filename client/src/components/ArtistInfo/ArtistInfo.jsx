/**
 * ArtistInfo.jsx
 *
 * @author nxxinf
 * @github https://github.com/fangnx
 * @created 2019-07-27 15:10:48
 * @last-modified 2019-07-27 23:54:36
 */

import React from 'react';
import { Segment, Image, Container, Header, Icon } from 'semantic-ui-react';
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
      summary:
        'Summary Summary Summary Summary Summary Summary Summary Summary Summary Summary Summary Summary  ',
      facebookUrl: '',
      twitterUrl: '',
      instagramUrl: ''
    };
  }

  async getArtistInfo() {
    await getArtistInfoFromGenius({ artistId: 34778 })
      .then(async res => {
        if (res.status === 200) {
          console.log(res);
          this.setState({
            name: res.data.name,
            altNames: res.data.alternate_names,
            artistMainImg: res.data.image_url
          });
          const rawDescription = res.data.description.dom.children;
          if (rawDescription.length > 0) {
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
            const pureTextDescription = flattenDom(rawDescription).reduce(
              (str0, str1) => str0 + str1
            );
            this.setState({ summary: pureTextDescription });
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
        <Image src={this.state.artistMainImg} className="artistInfo-topImage" />
        <Container className="artistInfo-container summary">
          <Header as="h1" className="artistInfo-name">
            {this.state.name}
          </Header>
          {this.state.summary}
        </Container>

        <Container className="artistInfo-container more" />

        <Container className="artistInfo-container socialMedia">
          <Icon
            name="facebook square"
            size="large"
            onClick={this.directToSocialMedia}
          />
          <Icon name="twitter square" size="large" />
          <Icon name="instagram" size="large" />
        </Container>
      </div>
    );
  }
}

export default ArtistInfo;
