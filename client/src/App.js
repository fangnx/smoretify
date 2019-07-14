import React from 'react';
import './App.css';
import CurrentSong from './components/CurrentSong/CurrentSong';
import SpotifyWebApi from 'spotify-web-api-js';
import { getUserSpotifyInfo } from './actions/authActions';

/**
 * Initializes Spotify Api in the frontend.
 * Sets the access token to the Spotify Web Api.
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

const App = () => {
  return (
    <div className="App">
      <CurrentSong />
    </div>
  );
};

export default App;
