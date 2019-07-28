/**
 * rootReducer.js
 *
 * @author nxxinf
 * @github https://github.com/fangnx
 * @created 2019-07-14 17:04:57
 * @last-modified 2019-07-14 17:07:26
 */

import { combineReducers } from 'redux';
import songInfoReducer from './songInfoReducer';

export default combineReducers({
  song: songInfoReducer
});
