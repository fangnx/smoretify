/**
 * index.js
 *
 * @author nxxinf
 * @github https://github.com/fangnx
 * @created 2019-07-14 17:04:57
 * @last-modified 2019-08-31 15:38:38
 */

import { combineReducers } from 'redux';
import spotifyStatusReducer from './spotifyStatusReducer';
import songInfoReducer from './songInfoReducer';
import geniusInfoReducer from './geniusInfoReducer';
import layoutReducer from './layoutReducer';

export default combineReducers({
  songInfo: songInfoReducer,
  geniusInfo: geniusInfoReducer,
  spotify: spotifyStatusReducer,
  layout: layoutReducer
});
