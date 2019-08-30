/**
 * rootReducer.js
 *
 * @author nxxinf
 * @github https://github.com/fangnx
 * @created 2019-07-14 17:04:57
 * @last-modified 2019-08-30 14:31:50
 */

import { combineReducers } from 'redux';
import spotifyReducer from './spotifyReducer';
import songInfoReducer from './songInfoReducer';
import geniusInfoReducer from './geniusInfoReducer';
import layoutReducer from './layoutReducer';

export const resetAppActionType = 'RESET_APP';

export default combineReducers({
  spotify: spotifyReducer,
  songInfo: songInfoReducer,
  geniusInfo: geniusInfoReducer,
  layout: layoutReducer
});
