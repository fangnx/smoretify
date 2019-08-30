/**
 * init-spotify.js
 *
 * @author nxxinf
 * @github https://github.com/fangnx
 * @created 2019-08-30 14:07:59
 * @last-modified 2019-08-30 16:25:27
 */

import SpotifyWebApi from 'spotify-web-api-js';
import { getUserSpotifyInfo, refreshSpotifyToken } from './actions/authActions';

/**
 * Initialize Spotify Api in the frontend.
 * Set the access token to the Spotify Web API.
 */
export const initSpotifyApi = async () => {
  const api = new SpotifyWebApi();
  let accessToken = '';
  await getUserSpotifyInfo().then(res => {
    if (res.data) {
      accessToken = res.data.accessToken;
      api.setAccessToken(accessToken);
    }
  });
  return api;
};

export const refreshSpotifyApi = async (api, refreshToken) => {
  await refreshSpotifyToken.then(res => {
    api.setAccessToken(res);
  });
  return api;
};
