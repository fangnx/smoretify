/**
 * songInfoReducer.js
 *
 * @author nxxinf
 * @github https://github.com/fangnx
 * @created 2019-07-14 17:07:21
 * @last-modified 2019-08-28 00:31:33
 */
import { resetAppActionType } from './rootReducer';

const initialState = {};

export const songInfoActionType = 'SONG_INFO';

export default (state = initialState, action) => {
  if (action.type === songInfoActionType) {
    return action.payload;
  } else if (action.type === resetAppActionType) {
    return initialState;
  }
  return state;
};
