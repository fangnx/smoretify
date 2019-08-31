/**
 * spotifyStatusReducer.js
 *
 * @author nxxinf
 * @github https://github.com/fangnx
 * @created 2019-08-30 14:30:55
 * @last-modified 2019-08-31 15:37:30
 */

import { CHANGE_SPOTIFY_STATUS } from './actionTypes';

export const initialState = {};

export default (state = initialState, action) => {
  if (action.type === CHANGE_SPOTIFY_STATUS) {
    return action.payload;
  }
  return state;
};
