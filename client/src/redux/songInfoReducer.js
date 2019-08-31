/**
 * songInfoReducer.js
 *
 * @author nxxinf
 * @github https://github.com/fangnx
 * @created 2019-07-14 17:07:21
 * @last-modified 2019-08-31 15:33:41
 */

import { UPDATE_SONG_INFO } from './actionTypes';

export const initialState = {};

export default (state = initialState, action) => {
  if (action.type === UPDATE_SONG_INFO) {
    return action.payload;
  }
  return state;
};
