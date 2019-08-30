/**
 * App.js
 *
 * @author nxxinf
 * @github https://github.com/fangnx
 * @created 2019-07-14 11:17:55
 * @last-modified 2019-08-30 14:08:32
 */

import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store';
import { resetAppActionType } from './reducers/rootReducer';
import MainBoard from './components/MainBoard';
import Toolbar from './components/Toolbar';
import './App.css';

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
