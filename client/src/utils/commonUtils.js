/**
 * commonUtils.js
 *
 * @author nxxinf
 * @github https://github.com/fangnx
 * @created 2019-08-16 20:23:35
 * @last-modified 2019-08-29 01:21:59
 */

export const trimSongName = songName => {
  const re = RegExp(' - ');
  if (!re.test(songName)) {
    return songName;
  }
  return songName.split(' - ')[0];
};

/**
 * Example YouTube video url:
 * http://www.youtube.com/watch?v=08DjMT-qR9g
 */
export const getYoutubeVideoID = url => {
  const match = url.match('[?&]v=([^&]+)');
  return match ? match[1] : '';
};
