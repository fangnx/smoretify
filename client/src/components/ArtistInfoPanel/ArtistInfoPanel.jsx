/**
 * ArtistInfoPanel.jsx
 *
 * @author nxxinf
 * @github https://github.com/fangnx
 * @created 2019-07-27 15:10:48
 * @last-modified 2019-08-24 01:50:59
 */

import React from 'react';
import './ArtistInfoPanel.css';
import { Image, Container, Header, Icon, Placeholder } from 'semantic-ui-react';
import WithScrollbar from '../Scrollbar/Scrollbar';
import { getArtistInfoFromGenius } from '../../actions/geniusActions';

class ArtistInfoPanel extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '\u00a0',
      altNames: [],
      artistMainImg: '',
      summary: '',
      facebookUrl: '',
      twitterUrl: '',
      instagramUrl: '',
      isReady: false
    };
  }

  async getArtistInfo(artistId) {
    await getArtistInfoFromGenius({ artistId })
      .then(async res => {
        if (res.status === 200) {
          await this.setState({
            name: res.data.name,
            altNames: res.data.alternate_names,
            artistMainImg: res.data.image_url,
            summary: res.data.description.html,
            isReady: true
          });
        }
      })
      .catch(err => console.log(err));
  }

  directToSocialMedia() {}

  async componentWillReceiveProps(nextProps) {
    await this.getArtistInfo(nextProps.searchedArtistId);
  }

  render() {
    const { isReady } = this.state;
    return (
      <div className="artistInfoPanel">
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

        <div className="topImage-wrapper">
          {isReady ? (
            <Image src={this.state.artistMainImg} className="topImage" />
          ) : (
            <Placeholder inverted>
              <Placeholder.Image style={{ height: 275, width: 275 }} />
            </Placeholder>
          )}
        </div>

        <Container className="artistInfo-container summary">
          <Header as="h3">Bio</Header>
          <div dangerouslySetInnerHTML={{ __html: this.state.summary }} />
        </Container>
      </div>
    );
  }
}

ArtistInfoPanel = WithScrollbar(ArtistInfoPanel);

export default ArtistInfoPanel;
