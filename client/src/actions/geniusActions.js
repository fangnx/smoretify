/**
 * geniusActions.js
 *
 * @author nxxinf
 * @github https://github.com/fangnx
 * @created 2019-07-14 15:30:28
 * @last-modified 2019-08-31 00:02:20
 */

import axios from 'axios';

/**
 * Search in Genius. Returns top n results.
 * @param searchTerm
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
    .post('/api/genius/get_artist', params)
    .then(res => res)
    .catch(err => err);
};

/**
 * Get Song info from Genius.
 * @param songId
 */
export const getSongInfoFromGenius = async params => {
  return axios
    .post('/api/genius/get_song', params)
    .then(res => res)
    .catch(err => err);
};

/**
 * Get Referents by Song from Genius.
 * @param songId
 */
export const getReferentsBySongFromGenius = async params => {
  return axios
    .post('/api/genius/get_referents_by_song', params)
    .then(res => res)
    .catch(err => err);
};

/**
 * Get lyrics by page URL from Genius.
 * @param URL
 */
export const getLyricsFromGenius = async params => {
  return axios
    .post('/api/genius/get_lyrics', params)
    .then(res => res)
    .catch(err => err);
};
