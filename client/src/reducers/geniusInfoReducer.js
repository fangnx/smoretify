/**
 * geniusInfoReducer.js
 *
 * @author nxxinf
 * @github https://github.com/fangnx
 * @created 2019-08-22 23:31:28
 * @last-modified 2019-08-30 14:37:01
 */
import { resetAppActionType } from './rootReducer';

export const initialState = {};

export const geniusInfoActionType = 'GENIUS_INFO';

export default (state = initialState, action) => {
  if (action.type === geniusInfoActionType) {
    return action.payload;
  } else if (action.type === resetAppActionType) {
    return initialState;
  }
  return state;
};
