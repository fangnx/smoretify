/**
 * init-spotify.js
 *
 * @author nxxinf
 * @github https://github.com/fangnx
 * @created 2019-08-30 14:07:59
 * @last-modified 2019-08-30 22:44:45
 */

import SpotifyWebApi from 'spotify-web-api-js';
import { getUserSpotifyInfo, refreshSpotifyToken } from './actions/authActions';

let spotifyApi = async () => await initSpotifyApi();

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
      console.log('original: ' + accessToken);
      api.setAccessToken(accessToken);
    }
  });
  return api;
};

export const refreshSpotifyApi = async (api, token) => {
  await refreshSpotifyToken(token).then(res => {
    const accessToken = res;
    api.setAccessToken(accessToken);
    console.log(accessToken);
  });
  return api;
};
