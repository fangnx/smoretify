/**
 * layoutReducer.js
 *
 * @author nxxinf
 * @github https://github.com/fangnx
 * @created 2019-08-29 14:01:26
 * @last-modified 2019-08-29 14:02:16
 */

const initialState = {};

export const layoutActionType = 'LAYOUT';

export default (state = initialState, action) => {
  if (action.type === layoutActionType) {
    return action.payload;
  }
  return state;
};
