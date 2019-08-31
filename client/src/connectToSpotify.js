/**
 * connectToSpotify.js
 *
 * @author nxxinf
 * @github https://github.com/fangnx
 * @created 2019-08-30 14:07:59
 * @last-modified 2019-08-31 01:34:18
 */

import SpotifyWebApi from 'spotify-web-api-js';
import { getUserSpotifyInfo, refreshSpotifyToken } from './actions/authActions';

/**
 * Initialize Spotify Api in the frontend.
 * Set the access token to Spotify API.
 */
export const initSpotifyApi = async () => {
  const api = new SpotifyWebApi();
  let accessToken = '';
  await getUserSpotifyInfo().then(res => {
    if (res && res.data) {
      accessToken = res.data.accessToken;
      api.setAccessToken(accessToken);
    }
  });
  return api;
};

/**
 * Refresh Spotify API with the updated access token.
 */
export const refreshSpotifyApi = async (api, token) => {
  await refreshSpotifyToken(token).then(res => {
    const accessToken = res;
    api.setAccessToken(accessToken);
    console.log(accessToken);
  });
  return api;
};
