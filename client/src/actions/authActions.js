/**
 * authActions.js
 *
 * @author nxxinf
 * @github https://github.com/fangnx
 * @created 2019-07-14 13:22:45
 * @last-modified 2019-08-30 22:04:09
 */

import axios from 'axios';
import { store } from '../store';

/**
 * Get user's Spotify authentication info.
 */
export const getUserSpotifyInfo = async () => {
  return axios
    .get('/user/spotify')
    .then(res => {
      if (res.status === 200) {
        store.dispatch({
          type: 'SPOTIFY',
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
          type: 'SPOTIFY',
          payload: {
            connected: false
          }
        });
      }
      return res;
    })
    .catch(err => console.log(err));
};

export const refreshSpotifyToken = async refresh_token => {
  return axios
    .get(`/api/spotify/refresh_token?token=${refresh_token}`)
    .then(res => {
      if (res && res.status === 200) {
        return res.data.access_token;
      }
    })
    .catch(err => console.log(err));
};
