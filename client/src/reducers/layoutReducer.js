/**
 * layoutReducer.js
 *
 * @author nxxinf
 * @github https://github.com/fangnx
 * @created 2019-08-29 14:01:26
 * @last-modified 2019-08-29 14:45:40
 */

export const initialState = {
  showYoutube: false,
  lyricsLeftAligned: true,
  lyricsFontFamily: 'dynamic'
};

export const layoutActionType = 'LAYOUT';

export default (state = initialState, action) => {
  if (action.type === layoutActionType) {
    return action.payload;
  }
  return state;
};
