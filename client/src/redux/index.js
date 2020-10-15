import { combineReducers } from 'redux';
import spotifyStatusReducer from './spotifyStatusReducer';
import songInfoReducer from './songInfoReducer';
import geniusInfoReducer from './geniusInfoReducer';
import layoutReducer from './layoutReducer';

export default combineReducers({
  songInfo: songInfoReducer,
  geniusInfo: geniusInfoReducer,
  spotify: spotifyStatusReducer,
  layout: layoutReducer,
});
