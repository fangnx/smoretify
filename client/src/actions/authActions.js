/**
 * authActions.js
 *
 * @author nxxinf
 * @github https://github.com/fangnx
 * @created 2019-07-14 13:22:45
 * @last-modified 2019-08-30 14:40:48
 */

import axios from 'axios';

/**
 * Get user's Spotify authentication info.
 */
export const getUserSpotifyInfo = async () => {
  return axios
    .get('/user/spotify')
    .then(res => {
      return res;
    })
    .catch(err => console.log(err));
};
