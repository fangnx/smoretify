/**
 * spotifyReducer.js
 *
 * @author nxxinf
 * @github https://github.com/fangnx
 * @created 2019-08-30 14:30:55
 * @last-modified 2019-08-30 16:17:34
 */

export const initialState = {};

export const spotifyActionType = 'SPOTIFY';
export const spotifyTokenActionType = 'SPOTIFY_TOKEN';

export default (state = initialState, action) => {
  if (action.type === spotifyActionType) {
    return action.payload;
  } else if (action.type === spotifyTokenActionType) {
    return {
      state,
      accessTokenExpired: true
    };
  }
  return state;
};
