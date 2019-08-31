/**
 * geniusInfoReducer.js
 *
 * @author nxxinf
 * @github https://github.com/fangnx
 * @created 2019-08-22 23:31:28
 * @last-modified 2019-08-31 15:30:59
 */

import { UPDATE_GENIUS_INFO } from './actionTypes';

export const initialState = {};

export default (state = initialState, action) => {
  if (action.type === UPDATE_GENIUS_INFO) {
    return action.payload;
  }
  return state;
};
