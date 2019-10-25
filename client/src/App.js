/**
 * App.js
 *
 * @author nxxinf
 * @github https://github.com/fangnx
 * @created 2019-07-14 11:17:55
 * @last-modified 2019-10-24 21:21:37
 */

import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store';
import MainBoardContainer from './components/MainBoard';
import Toolbar from './components/Toolbar';
import './App.css';
import './animations.css';

const App = () => {
  return (
    <div className="App">
      <Provider store={store}>
        <MainBoardContainer />
        <Toolbar />
      </Provider>
    </div>
  );
};

export default App;
