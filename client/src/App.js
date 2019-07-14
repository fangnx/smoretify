/**
 * App.js
 *
 * @author nxxinf
 * @github https://github.com/fangnx
 * @created 2019-07-14 11:17:55
 * @last-modified 2019-07-14 16:24:01
 */

import React from 'react';
import './App.css';
import CurrentSong from './components/CurrentSong/CurrentSong';
import SongLyrics from './components/SongLyrics/SongLyrics';
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
      <SongLyrics />
    </div>
  );
};

export default App;
