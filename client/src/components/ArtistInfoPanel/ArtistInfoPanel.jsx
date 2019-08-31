/**
 * ArtistInfoPanel.jsx
 *
 * @author nxxinf
 * @github https://github.com/fangnx
 * @created 2019-07-27 15:10:48
 * @last-modified 2019-08-31 16:06:46
 */

import React from 'react';
import { connect } from 'react-redux';
import WithScrollbar from '../Scrollbar/Scrollbar';
import { getArtistInfoFromGenius } from '../../api/geniusActions';
import { Image, Container, Header, Icon, Placeholder } from 'semantic-ui-react';
import './ArtistInfoPanel.css';

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
            facebookName: res.data.facebook_name,
            twitterName: res.data.twitterName,
            insName: res.data.instagram_name,
            isReady: true
          });
        }
      })
      .catch(err => console.log(err));
  }

  directToSocialMedia() {}

  async componentWillReceiveProps(nextProps) {
    if (nextProps.artistId !== this.props.artistId) {
      this.setState({ isReady: false });
      if (nextProps.artistId >= 0) {
        await this.getArtistInfo(nextProps.artistId);
      }
    }
  }

  render() {
    let artistSummary = this.state.summary;

    if (artistSummary.match(/<p>(\?)<\/p>/g)) {
      artistSummary = '<p>No artist info available.</p>';
    }
    const fillArr = new Array(20).fill(0);

    return (
      <div className="artistInfoPanel">
        <Container className="artistInfo-container title">
          <Header as="h1" className="artistInfo-name">
            {this.state.name}
          </Header>
          <div className="socialMedia">
            {this.state.isReady ? (
              <>
                <Icon
                  name="facebook square"
                  onClick={this.directToSocialMedia}
                />
                <Icon name="twitter square" />
                <Icon name="instagram" />
              </>
            ) : (
              <Placeholder fluid inverted>
                <Placeholder.Line />
              </Placeholder>
            )}
          </div>
        </Container>

        <div className="topImage-wrapper">
          {this.state.isReady ? (
            <Image src={this.state.artistMainImg} className="topImage" />
          ) : (
            <Placeholder inverted>
              <Placeholder.Image style={{ height: 275, width: 275 }} />
            </Placeholder>
          )}
        </div>

        <Container className="artistInfo-container summary">
          <Header as="h3">Bio</Header>
          {this.state.isReady ? (
            <div dangerouslySetInnerHTML={{ __html: artistSummary }} />
          ) : (
            <Placeholder fluid inverted>
              {fillArr.map((_, index) => (
                <Placeholder.Line
                  key={`artistSummary-placeholderLine-${index}`}
                />
              ))}
            </Placeholder>
          )}
        </Container>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { geniusInfo } = state;
  return {
    artistId: geniusInfo.primaryArtistId
  };
};

ArtistInfoPanel = WithScrollbar(ArtistInfoPanel);

export default connect(
  mapStateToProps,
  null
)(ArtistInfoPanel);
