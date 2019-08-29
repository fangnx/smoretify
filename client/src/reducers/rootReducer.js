/**
 * rootReducer.js
 *
 * @author nxxinf
 * @github https://github.com/fangnx
 * @created 2019-07-14 17:04:57
 * @last-modified 2019-08-29 14:02:42
 */

import { combineReducers } from 'redux';
import songInfoReducer from './songInfoReducer';
import geniusInfoReducer from './geniusInfoReducer';
import layoutReducer from './layoutReducer';

export const resetAppActionType = 'RESET_APP';

export default combineReducers({
  songInfo: songInfoReducer,
  geniusInfo: geniusInfoReducer,
  layout: layoutReducer
});
