/**
 * parseMediaInfo.js
 *
 * @author nxxinf
 * @github https://github.com/fangnx
 * @created 2019-08-29 20:27:24
 * @last-modified 2019-08-31 18:29:16
 */

/**
 * Example YouTube video url:
 * http://www.youtube.com/watch?v=08DjMT-qR9g
 */
export const getYoutubeVideoID = url => {
  if (url) {
    const match = url.match('[?&]v=([^&]+)');
    return match ? match[1] : '';
  }
  return '';
};
