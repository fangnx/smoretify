/**
 * songInfoActions.js
 *
 * @author nxxinf
 * @github https://github.com/fangnx
 * @created 2019-07-14 15:30:28
 * @last-modified 2019-07-14 16:43:17
 */

import axios from 'axios';

const geniusAccessToken =
  'KGQ7OO-SYtejw2vwMVPmSG6xPxy4tmLaMN0jnkBygC3A2GFA7yCA2gM1kwsEQxpb';

const withAccessTokenKey = `?access_token=${geniusAccessToken}`;

/**
 * Calls search API from Genius.com
 */
export const searchFromGenius = async params => {
  console.log(params.query);
  return axios
    .get(
      'http://api.genius.com/search/' +
        withAccessTokenKey +
        `&q=${params.query}`
    )
    .then(res => res)
    .catch(err => console.log(err));
};
