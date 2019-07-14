/**
 * authActions.js
 *
 * @author nxxinf
 * @github https://github.com/fangnx
 * @created 2019-07-14 13:22:45
 * @last-modified 2019-07-14 13:25:32
 */

import axios from 'axios';

/**
 * Get user's Spotify authentification info.
 */
export const getUserSpotifyInfo = async () => {
  return axios
    .get('/user/spotify')
    .then(res => res)
    .catch(err => console.log(err));
};
