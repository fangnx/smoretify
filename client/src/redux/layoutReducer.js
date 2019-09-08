/**
 * layoutReducer.js
 *
 * @author nxxinf
 * @github https://github.com/fangnx
 * @created 2019-08-29 14:01:26
 * @last-modified 2019-09-08 15:10:42
 */

import {
  TOGGLE_YOUTUBE,
  CHANGE_LYRICS_ALIGNMENT,
  CHANGE_LYRICS_FONT,
  TOGGLE_LYRICS_ITALICIZED,
  CHANGE_APP_BRIGHTNESS
} from './actionTypes';

export const initialState = {
  showYoutube: false,
  lyricsLeftAligned: true,
  lyricsFontFamily: 'var(--font-dynamic)',
  lyricsItalicized: false,
  appBrightness: 1.0
};

export default (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_YOUTUBE:
      return { ...state, showYoutube: action.payload.showYoutube };
    case CHANGE_LYRICS_ALIGNMENT:
      return { ...state, lyricsLeftAligned: action.payload.lyricsLeftAligned };
    case CHANGE_LYRICS_FONT:
      return { ...state, lyricsFontFamily: action.payload.lyricsFontFamily };
    case TOGGLE_LYRICS_ITALICIZED:
      return { ...state, lyricsItalicized: action.payload.lyricsItalicized };
    case CHANGE_APP_BRIGHTNESS:
      return { ...state, appBrightness: action.payload.appBrightness };
    default:
      return state;
  }
};
