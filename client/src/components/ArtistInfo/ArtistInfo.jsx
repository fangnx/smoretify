/**
 * ArtistInfo.jsx
 *
 * @author nxxinf
 * @github https://github.com/fangnx
 * @created 2019-07-27 15:10:48
 * @last-modified 2019-07-27 22:18:57
 */

import React from 'react';
import { Segment, Image, Container, Header, Icon } from 'semantic-ui-react';
import './ArtistInfo.css';
import { searchFromGenius } from '../../actions/geniusActions';

class ArtistInfo extends React.Component {
  constructor() {
    super();
    this.state = {
      name: 'Pulp',
      artistMainImg:
        'https://images.genius.com/6bcd2bd1708eeae7282400f1e4be633f.600x600x1.jpg',
      summary:
        'Sia Kate Isobelle Furler (born December 18, 1975), popularly known as Sia, is an Australian pop singer and songwriter. She is also part of the supergroup, LSD alongside, British singer, Labrinth and American DJ, Diplo. Before her solo debut, Sia also lended vocals to British acid-jazz duo,',
      facebookUrl: '',
      twitterUrl: '',
      instagramUrl: ''
    };
  }
  // async getLyrics() {
  //   searchFromGenius({
  //     query: 'Common People pulp'
  //   }).then(res => res);
  // }

  async getArtistInfo() {
    await searchFromGenius({ searchTerm: 'common people' }).then(async res =>
      console.log(res)
    );
  }

  directToSocialMedia() {}

  async componentWillMount() {
    await this.getArtistInfo();
  }

  render() {
    return (
      <div className="artistInfo-panel">
        <Image src={this.state.artistMainImg} className="artistInfo-topImage" />
        <Container className="artistInfo-container summary">
          <Header as="h1" className="artistInfo-name">
            {this.state.name}
          </Header>
          Sia Kate Isobelle Furler (born December 18, 1975), popularly known as
          Sia, is an Australian pop singer and songwriter. She is also part of
          the supergroup, LSD alongside, British singer, Labrinth and American
          DJ, Diplo. Before her solo debut, Sia also lended vocals to British
          acid-jazz duo,
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
