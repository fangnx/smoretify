/**
 * PlayerPanel.jsx
 *
 * @author nxxinf
 * @github https://github.com/fangnx
 * @created 2019-06-16 01:45:13
 * @last-modified 2019-08-29 15:05:30
 */

import React from 'react';
import { connect } from 'react-redux';
import { store } from '../../store';
import './PlayerPanel.css';
import { Container, Header } from 'semantic-ui-react';
import WithScrollbar from '../Scrollbar/Scrollbar';
import TrackInfoWidget from './TrackInfoWidget/TrackInfoWidget';
import { initSpotifyApi } from '../../App';
import { trimSongName } from '../../utils/commonUtils';
import SpotifySongWidget from './SpotifySongWidget/SpotifySongWidget';
import SongSummaryWidget from './SongSummaryWidget/SongSummaryWidget';

class LeftPanel extends React.Component {
  constructor() {
    super();
    this.state = {
      isReady: false
    };
  }

  async getCurrentSong() {
    const spotifyApi = await initSpotifyApi();

    setInterval(async () => {
      spotifyApi
        .getMyCurrentPlaybackState()
        .then(res => {
          const spotifySongName = res.item.name;
          const spotifyArtists = res.item.artists.map(artist => artist.name);
          let { currentSongName, currentArtists } = store.getState().songInfo;
          if (
            currentSongName &&
            currentArtists &&
            spotifyArtists.every(e => currentArtists.indexOf(e) > -1)
          ) {
            if (spotifySongName === currentSongName) {
              return;
            }
          }

          if (res) {
            this.setState({
              isReady: true
            });
          }

          currentSongName = spotifySongName;
          currentArtists = spotifyArtists;

          this.props.dispatch({
            type: 'SONG_INFO',
            payload: {
              currentSongName,
              trimmedCurrentSongName: trimSongName(currentSongName),
              currentSongImg: res.item.album.images[0].url,
              currentArtists,
              externalSpotifyUrl: res.item.external_urls.spotify
            }
          });

          this.props.dispatch({
            type: 'GENIUS_INFO',
            payload: {
              songSummary: '',
              songLyricsUrl: ''
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
    return (
      <div className="playerPanel">
        {this.state.isReady ? (
          <div>
            <SpotifySongWidget />

            <div className="playerPanel-text">
              <Container className="playerPanel-container">
                <Header as="h3">About</Header>
                <SongSummaryWidget />
              </Container>

              <Container className="playerPanel-container">
                <Header as="h3">Track Info</Header>
                <TrackInfoWidget data={this.props.trackInfo} />
              </Container>
            </div>
          </div>
        ) : (
          <></>
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
