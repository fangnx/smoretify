/**
 * App.js
 *
 * @author nxxinf
 * @github https://github.com/fangnx
 * @created 2019-07-14 11:17:55
 * @last-modified 2019-08-10 23:05:22
 */

import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store';
import './App.css';
import MainBoard from './components/MainBoard/MainBoard';
import Toolbar from './components/Toolbar/Toolbar';
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
      <Provider store={store}>
        <MainBoard />
        <Toolbar />
      </Provider>
    </div>
  );
};

export default App;
