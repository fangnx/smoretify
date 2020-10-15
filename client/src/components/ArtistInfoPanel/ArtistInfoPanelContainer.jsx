import React from 'react';
import { connect } from 'react-redux';
import withScrollbar from '../Scrollbar/Scrollbar';
import { getArtistInfoFromGenius } from '../../api/geniusAPI';
import ArtistInfoPanel from './ArtistInfoPanel';

class ArtistInfoPanelContainer extends React.Component {
  constructor() {
    super();
    this.state = {
      mainImg: '',
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
            mainImg: res.data.image_url,
            summary: res.data.description.html,
            facebookName: res.data.facebook_name,
            twitterName: res.data.twitterName,
            insName: res.data.instagram_name,
            isReady: true
          });
        }
      })
      .catch(err => err);
  }

  /**
   * For artistId:
   * -404: no matched search result from Genius, thus cannot conduct the search.
   * -2: signals the artists are unchanged, thus no need for update/state change.
   * -1: signals change in currently placed track.
   * >=0: valid artist ID, should begin the search.
   */
  async componentWillReceiveProps(nextProps) {
    if (nextProps.artistId === -2 || this.props.artistId === -2) {
      return;
    }

    if (nextProps.artistId === -404) {
      await this.setState({
        summary:
          '<p>Artist bio not available.</p><p>The current song is not found on Genius.com</p>',
        mainImg: '',
        facebookName: '',
        twitterName: '',
        insName: '',
        isReady: true
      });
      return;
    }

    if (nextProps.artistId !== this.props.artistId) {
      this.setState({ isReady: false });
      if (nextProps.artistId !== -1) {
        await this.getArtistInfo(nextProps.artistId);
      }
    }
  }

  render() {
    let summary = this.state.summary;
    if (summary.match(/<p>(\?)<\/p>/g)) {
      summary = '<p>Artist bio not available.</p>';
    }
    const fillArr = new Array(20).fill(0);

    return (
      <ArtistInfoPanel
        fillArr={fillArr}
        isReady={this.state.isReady}
        mainImage={this.state.mainImg}
        name={this.props.primaryArtistName}
        summary={summary}
      ></ArtistInfoPanel>
    );
  }
}

const mapStateToProps = state => {
  const { geniusInfo, songInfo } = state;
  return {
    artistId: geniusInfo.primaryArtistId,
    primaryArtistName: songInfo.currentArtists ? songInfo.currentArtists[0] : ''
  };
};

ArtistInfoPanelContainer = withScrollbar(ArtistInfoPanelContainer);

export default connect(
  mapStateToProps,
  null
)(ArtistInfoPanelContainer);
