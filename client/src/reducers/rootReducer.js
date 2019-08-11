/**
 * rootReducer.js
 *
 * @author nxxinf
 * @github https://github.com/fangnx
 * @created 2019-07-14 17:04:57
 * @last-modified 2019-08-11 00:13:51
 */

import { combineReducers } from 'redux';
import songInfoReducer from './songInfoReducer';

export default combineReducers({
  songInfo: songInfoReducer
});
