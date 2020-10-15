import { CHANGE_SPOTIFY_STATUS } from './actionTypes';

export const initialState = {};

export default (state = initialState, action) => {
  if (action.type === CHANGE_SPOTIFY_STATUS) {
    return action.payload;
  }
  return state;
};
