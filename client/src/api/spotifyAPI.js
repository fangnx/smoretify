/**
 * spotifyAPI.js
 *
 * @author nxxinf
 * @github https://github.com/fangnx
 * @created 2019-07-14 13:22:45
 * @last-modified 2019-08-31 20:56:38
 */

import axios from 'axios';
import { store } from '../store';

/**
 * Get user's Spotify authentication info.
 */
export const getUserSpotifyInfo = async () => {
  return axios
    .get('/api/spotify/auth_info')
    .then(res => {
      if (res && !res.data.error) {
        store.dispatch({
          type: 'CHANGE_SPOTIFY_STATUS',
          payload: {
            connected: true,
            refreshToken: res.data.refreshToken,
            displayName: res.data.displayName,
            country: res.data.country,
            profilePhotoUrl: res.data.photos[0]
          }
        });
      } else {
        store.dispatch({
          type: 'CHANGE_SPOTIFY_STATUS',
          payload: {
            connected: false
          }
        });
      }
      return res;
    })
    .catch(err => err);
};

/**
 * Get a refreshed access token (which expires in 3600 seconds) from the Spotify web API server.
 * @param {*} refresh_token refresh token used to make the request.
 */
export const refreshSpotifyToken = async refresh_token => {
  return axios
    .get(`/api/spotify/refresh_token?token=${refresh_token}`)
    .then(res => {
      if (res && res.status === 200) {
        return res.data.access_token;
      }
    })
    .catch(err => err);
};
