/**
 * commonUtils.js
 *
 * @author nxxinf
 * @github https://github.com/fangnx
 * @created 2019-08-16 20:23:35
 * @last-modified 2019-08-29 20:27:35
 */

export const trimSongName = songName => {
  const re = RegExp(' - ');
  if (!re.test(songName)) {
    return songName;
  }
  return songName.split(' - ')[0];
};
