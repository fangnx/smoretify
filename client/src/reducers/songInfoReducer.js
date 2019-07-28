/**
 * songInfoReducer.js
 *
 * @author nxxinf
 * @github https://github.com/fangnx
 * @created 2019-07-14 17:07:21
 * @last-modified 2019-07-14 17:09:33
 */

const initialState = {};
export const songInfoActionType = 'SONG_INFO';

export default (state = initialState, action) => {
  if (action.type === songInfoActionType) {
    return action.payload;
  }
  return state;
};
