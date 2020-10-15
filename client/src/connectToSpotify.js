import SpotifyWebApi from 'spotify-web-api-js';
import { getUserSpotifyInfo, refreshSpotifyToken } from './api/spotifyAPI';

/**
 * Initialize Spotify API in the frontend.
 * Set the access token to Spotify API.
 */
export const initSpotifyApi = async () => {
  const api = new SpotifyWebApi();
  let accessToken = '';
  await getUserSpotifyInfo().then((res) => {
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
  await refreshSpotifyToken(token).then((res) => {
    const accessToken = res;
    api.setAccessToken(accessToken);
    console.log('Spotify access token has been refreshed.');
  });
  return api;
};
