/**
 * geniusActions.js
 *
 * @author nxxinf
 * @github https://github.com/fangnx
 * @created 2019-07-14 15:30:28
 * @last-modified 2019-07-27 17:18:56
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
