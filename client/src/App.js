/**
 * App.js
 *
 * @author nxxinf
 * @github https://github.com/fangnx
 * @created 2019-07-14 11:17:55
 * @last-modified 2019-08-28 14:24:27
 */

import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store';
import { resetAppActionType } from './reducers/rootReducer';
import MainBoard from './components/MainBoard';
import Toolbar from './components/Toolbar';
import SpotifyWebApi from 'spotify-web-api-js';
import { getUserSpotifyInfo } from './actions/authActions';
import './App.css';

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
  store.dispatch({ type: resetAppActionType });

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
