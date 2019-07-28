/**
 * geniusActions.js
 *
 * @author nxxinf
 * @github https://github.com/fangnx
 * @created 2019-07-14 15:30:28
 * @last-modified 2019-07-27 22:50:40
 */

import axios from 'axios';

/**
 * Search in Genius. Returns top n results.
 */
export const searchFromGenius = async params => {
  return axios
    .post('/api/genius/search', params)
    .then(res => res)
    .catch(err => console.log(err));
};

/**
 * Get Artist info from Genius.
 * @param artistID
 */
export const getArtistInfoFromGenius = async params => {
  return axios
    .post('/api/genius/getArtist', params)
    .then(res => res)
    .catch(err => err);
};
