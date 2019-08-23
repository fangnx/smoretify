/**
 * geniusInfoReducer.js
 *
 * @author nxxinf
 * @github https://github.com/fangnx
 * @created 2019-08-22 23:31:28
 * @last-modified 2019-08-22 23:32:26
 */

const initialState = {};

export const geniusInfoActionType = 'GENIUS_INFO';

export default (state = initialState, action) => {
  if (action.type === geniusInfoActionType) {
    return action.payload;
  }
  return state;
};
