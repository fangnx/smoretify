/**
 * PlayerPanel.jsx
 *
 * @author nxxinf
 * @github https://github.com/fangnx
 * @created 2019-06-16 01:45:13
 * @last-modified 2019-08-22 22:17:26
 */

import React from 'react';
import { connect } from 'react-redux';
import { store } from '../../store';
import './PlayerPanel.css';
import { Container, Image, Icon, Header } from 'semantic-ui-react';
import WithScrollbar from '../Scrollbar/Scrollbar';
import spotifyGreenIcon from '../../assets/Spotify_Icon_CMYK_Green.png';
import TrackArtistsInfo from './TrackArtistsInfo/TrackArtistsInfo';
import { initSpotifyApi } from '../../App';
import { trimSongName } from '../../utils/commonUtils';

class LeftPanel extends React.Component {
  constructor() {
    super();
    this.state = {
      isReady: false,
      currentSongName: '',
      currentArtists: [],
      songImg: ''
    };
  }

  /**
   * @deprecated
   */
  getHashParams() {
    var hashParams = {};
    var e,
      r = /([^&;=]+)=?([^&;]*)/g,
      q = window.location.hash.substring(1);
    e = r.exec(q);
    while (e) {
      hashParams[e[1]] = decodeURIComponent(e[2]);
      e = r.exec(q);
    }
    return hashParams;
  }

  async getCurrentSong() {
    const spotifyApi = await initSpotifyApi();

    setInterval(async () => {
      spotifyApi
        .getMyCurrentPlaybackState()
        .then(res => {
          const spotifySongName = res.item.name;
          const spotifyArtists = res.item.artists.map(artist => artist.name);
          const { currentSongName, currentArtists } = store.getState().songInfo;
          if (
            spotifySongName === currentSongName &&
            spotifyArtists.every(e => currentArtists.indexOf(e) > -1)
          ) {
            console.log('NOT');
            return;
          }

          if (res) {
            console.log('a');
            this.setState({
              isReady: true,
              currentSongName: spotifySongName,
              currentArtists: spotifyArtists,
              songImg: res.item.album.images[0].url,
              externalSpotifyUrl: res.item.external_urls.spotify
            });
          } else {
            this.setState({
              isReady: true,
              songImg: spotifyGreenIcon
            });
          }

          this.props.dispatch({
            type: 'SONG_INFO',
            payload: {
              currentSongName: spotifySongName,
              trimmedCurrentSongName: trimSongName(spotifySongName),
              currentArtists: spotifyArtists
            }
          });
        })
        .catch(err => console.log(err));
    }, 5000);
  }

  componentWillMount() {
    this.getCurrentSong();
  }

  onClickUrl(type) {
    if (type === 'spotify') {
      window.open(this.state.externalSpotifyUrl);
    }
  }

  render() {
    console.log('!!!!');
    return (
      <div className="currentSong-panel">
        {this.state.isReady ? (
          <div className="currentSong-widget">
            <Image
              src={this.state.songImg}
              wrapped
              className="currentSong-img"
            />
            <div className="currentSong-text">
              <div className="songName">{this.state.currentSongName}</div>
              <div className="artistNames">{this.state.currentArtists[0]}</div>
              <div className="links">
                <Icon
                  name="spotify"
                  onClick={() => this.onClickUrl('spotify')}
                />
              </div>

              <Container className="currentSong-container aboutTheSong">
                <Header as="h3" className="aboutTheSong-header">
                  About the Song
                </Header>
                <div>{this.props.description}</div>
              </Container>

              <Container className="currentSong-container trackInfo">
                <Header as="h3" className="trackInfo-header">
                  Track Info
                </Header>
                <TrackArtistsInfo data={this.props.trackInfo} />
              </Container>
            </div>
          </div>
        ) : (
          ''
        )}
      </div>
    );
  }
}

LeftPanel = WithScrollbar(LeftPanel);

export default connect(
  null,
  null
)(LeftPanel);
