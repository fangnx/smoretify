import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import rootReducer from './redux';
import { initialState as layoutInitialState } from './redux/layoutReducer';

const initialState = {
  songInfo: {},
  geniusInfo: {},
  spotify: {},
  layout: layoutInitialState,
};

const middleware = [thunk];

// Persist the layout preferences.
const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['songInfo', 'geniusInfo', 'spotify'],
  whitelist: ['layout'],
};
const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = createStore(
  persistedReducer,
  initialState,
  compose(applyMiddleware(...middleware))
);
const persistor = persistStore(store);

export { store, persistor };
