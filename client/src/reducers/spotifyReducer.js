/**
 * spotifyReducer.js
 *
 * @author nxxinf
 * @github https://github.com/fangnx
 * @created 2019-08-30 14:30:55
 * @last-modified 2019-08-30 14:31:19
 */

export const initialState = {};

export const songInfoActionType = 'SPOTIFY';

export default (state = initialState, action) => {
  if (action.type === songInfoActionType) {
    return action.payload;
  }
  return state;
};
