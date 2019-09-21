/**
 * PlayerPanelContainer.jsx
 *
 * @author nxxinf
 * @github https://github.com/fangnx
 * @created 2019-06-16 01:45:13
 * @last-modified 2019-09-20 21:11:42
 */

import React from 'react';
import { connect } from 'react-redux';
import { store } from '../../store';
import { initSpotifyApi, refreshSpotifyApi } from '../../connectToSpotify';
import { trimSongName } from '../../utils/commonUtils';
import withScrollbar from '../Scrollbar/Scrollbar';
import PlayerPanel from './PlayerPanel';

let spotifyApi = async () => await initSpotifyApi();

class PlayerPanelContainer extends React.Component {
  /**
   * Get the currently played track from the Spotify API.
   *
   * Since Spotify Web API does not support watching the current track status,
   * not does it emit any event on change,
   * the method sends a request every 4 seconds to detect if the currently played tracked has change.
   */
  async getCurrentTrack() {
    const api = await spotifyApi();

    setInterval(async () => {
      api
        .getMyCurrentPlaybackState()
        .then(res => {
          const resSongName = res.item.name;
          const resArtists = res.item.artists.map(artist => artist.name);
          let { currentSongName, currentArtists } = store.getState().songInfo;
          // If the responded song name & artist names are both the same,
          // the track played has not changed.
          const artistsUnchanged =
            currentArtists &&
            resArtists.every(e => currentArtists.indexOf(e) > -1);
          if (
            currentSongName &&
            resSongName === currentSongName &&
            artistsUnchanged
          ) {
            return;
          }

          // Since the track played has changed, update the song name and artist names.
          currentSongName = resSongName;
          currentArtists = resArtists;

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

          // Fire `UPDATE_GENIUS_INFO` event to signal change in currently played track.
          // This would replace the previous displayed content (song summary, ...) with placeholder lines.
          // If artists are not changed from the previous track, update `primaryArtistID` to -2 to signal it.
          // Else, update `primaryArtistID` to -1 to toggle the `isReady` state of artistInfo widget.
          const currentPrimaryArtistId = store.getState().geniusInfo
            .primaryArtistId;
          this.props.dispatch({
            type: 'UPDATE_GENIUS_INFO',
            payload: {
              songSummary: '',
              songLyricsUrl: '',
              primaryArtistId:
                currentPrimaryArtistId !== -404 && artistsUnchanged ? -2 : -1
            }
          });
        })
        // If the Spotify API session has expired,
        // dispatch an event to trigger requesting a refreshed access token.
        .catch(async () => {
          console.log('Spotify access token has expired.');
          const refreshToken = store.getState().spotify.refreshToken;
          if (refreshToken) {
            spotifyApi = await refreshSpotifyApi(api, refreshToken);
          }
        });
    }, 3000);
  }

  componentWillMount() {
    this.getCurrentTrack();
  }

  render() {
    return <PlayerPanel />;
  }
}

PlayerPanelContainer = withScrollbar(PlayerPanelContainer);

export default connect(
  null,
  null
)(PlayerPanelContainer);
