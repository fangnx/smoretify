/**
 * PlayerPanel.jsx
 *
 * @author nxxinf
 * @github https://github.com/fangnx
 * @created 2019-06-16 01:45:13
 * @last-modified 2019-08-31 17:00:24
 */

import React from 'react';
import { connect } from 'react-redux';
import { store } from '../../store';
import './PlayerPanel.css';
import WithScrollbar from '../Scrollbar/Scrollbar';
import TrackInfoWidget from './TrackInfoWidget';
import { initSpotifyApi, refreshSpotifyApi } from '../../connectToSpotify';
import { trimSongName } from '../../utils/commonUtils';
import SpotifySongWidget from './SpotifySongWidget';
import SongSummaryWidget from './SongSummaryWidget';
import { Container, Header } from 'semantic-ui-react';

let spotifyApi = async () => await initSpotifyApi();

class LeftPanel extends React.Component {
  /**
   * Get the currently played track from the Spotify API.
   *
   * Since Spotify Web API does not support watching the current track status,
   * not does it emit any event on change,
   * the method sends a request every 5 seconds to detect if the currently played tracked has change.
   */
  async getCurrentTrack() {
    const api = await spotifyApi();

    setInterval(async () => {
      api
        .getMyCurrentPlaybackState()
        .then(res => {
          const spotifySongName = res.item.name;
          const spotifyArtists = res.item.artists.map(artist => artist.name);
          let { currentSongName, currentArtists } = store.getState().songInfo;
          // If the responded song name & artist names are both the same,
          // the track played has not changed.
          if (
            currentSongName &&
            currentArtists &&
            spotifyArtists.every(e => currentArtists.indexOf(e) > -1)
          ) {
            if (spotifySongName === currentSongName) {
              return;
            }
          }

          // Since the track played has changed, update the song name and artist names.
          currentSongName = spotifySongName;
          currentArtists = spotifyArtists;

          this.props.dispatch({
            type: 'UPDATE_SONG_INFO',
            payload: {
              currentSongName,
              trimmedCurrentSongName: trimSongName(currentSongName),
              currentSongImg: res.item.album.images[0].url,
              currentArtists,
              externalSpotifyUrl: res.item.external_urls.spotify
            }
          });

          this.props.dispatch({
            type: 'UPDATE_GENIUS_INFO',
            payload: {
              songSummary: '',
              songLyricsUrl: ''
            }
          });
        })
        // If the Spotify API session has expired,
        // dispatch an event to trigger requesting a refreshed access token.
        .catch(async () => {
          const refreshToken = store.getState().spotify.refreshToken;
          console.log(refreshToken);
          if (refreshToken) {
            spotifyApi = await refreshSpotifyApi(api, refreshToken);
          }
        });
    }, 5000);
  }

  componentWillMount() {
    this.getCurrentTrack();
  }

  render() {
    return (
      <div className="playerPanel">
        <SpotifySongWidget />

        <div className="playerPanel-text">
          <Container className="playerPanel-container">
            <Header as="h3">About</Header>
            <SongSummaryWidget />
          </Container>

          {/* <Container className="playerPanel-container">
            <Header as="h3">Track Info</Header>
            <TrackInfoWidget />
          </Container> */}
        </div>
      </div>
    );
  }
}

LeftPanel = WithScrollbar(LeftPanel);

export default connect(
  null,
  null
)(LeftPanel);
