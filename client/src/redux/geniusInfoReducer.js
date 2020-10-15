import { UPDATE_GENIUS_INFO } from './actionTypes';

export const initialState = {};

export default (state = initialState, action) => {
  if (action.type === UPDATE_GENIUS_INFO) {
    return action.payload;
  }
  return state;
};
