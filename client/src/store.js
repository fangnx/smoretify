/**
 * store.js
 *
 * @author nxxinf
 * @github https://github.com/fangnx
 * @created 2019-07-14 17:03:21
 * @last-modified 2019-08-31 01:33:42
 */

import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import rootReducer from './reducers/rootReducer';
import { initialState as songInfoInitialState } from './reducers/songInfoReducer';
import { initialState as geniusInfoInitialState } from './reducers/geniusInfoReducer';
import { initialState as layoutInitialState } from './reducers/layoutReducer';

const initialState = {
  songInfo: songInfoInitialState,
  geniusInfo: geniusInfoInitialState,
  layout: layoutInitialState,
  spotify: {}
};
const middleware = [thunk];

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['songInfo', 'geniusInfo', 'spotify'],
  whitelist: ['layout']
};
const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = createStore(
  persistedReducer,
  initialState,
  compose(applyMiddleware(...middleware))
);
const persistor = persistStore(store);

export { store, persistor };
