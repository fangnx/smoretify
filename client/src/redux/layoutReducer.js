/**
 * layoutReducer.js
 *
 * @author nxxinf
 * @github https://github.com/fangnx
 * @created 2019-08-29 14:01:26
 * @last-modified 2019-08-31 15:14:37
 */

export const initialState = {
  showYoutube: false,
  lyricsLeftAligned: true,
  lyricsFontFamily: 'dynamic'
};

export const TOGGLE_YOUTUBE = 'TOGGLE_YOUTUBE';
export const CHANGE_LYRICS_ALIGNMENT = 'CHANGE_LYRICS_ALIGNMENT';
export const CHANGE_LYRICS_FONT = 'CHANGE_LYRICS_FONT';

export default (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_YOUTUBE:
      return { ...state, showYoutube: action.payload.showYoutube };
    case CHANGE_LYRICS_ALIGNMENT:
      return { ...state, lyricsLeftAligned: action.payload.lyricsLeftAligned };
    case CHANGE_LYRICS_FONT:
      return { ...state, lyricsFontFamily: action.payload.lyricsFontFamily };
    default:
      return state;
  }
};
