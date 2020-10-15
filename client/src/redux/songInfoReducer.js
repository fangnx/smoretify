import { UPDATE_SONG_INFO } from './actionTypes';

export const initialState = {};

export default (state = initialState, action) => {
  if (action.type === UPDATE_SONG_INFO) {
    return action.payload;
  }
  return state;
};
