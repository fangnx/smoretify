/**
 * songInfoReducer.js
 *
 * @author nxxinf
 * @github https://github.com/fangnx
 * @created 2019-07-14 17:07:21
 * @last-modified 2019-08-22 22:07:36
 */

const initialState = {};

export const songInfoActionType = 'SONG_INFO';
export const globalReset = 'GLOBAL_RESET';

export default (state = initialState, action) => {
  if (action.type === songInfoActionType) {
    return action.payload;
  } else if (action.type === globalReset) {
    return initialState;
  }
  return state;
};
