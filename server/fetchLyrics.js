/**
 * fetchLyrics.js
 *
 * @author nxxinf
 * @github https://github.com/fangnx
 * @created 2019-08-01 21:38:16
 * @last-modified 2019-08-28 16:16:05
 */

import request from 'request';
import cheerio from 'cheerio';
import URL from 'url-parse';

const doRequest = page => {
  return new Promise((resolve, reject) => {
    request(page, (err, res, body) => {
      if (err || res.statusCode !== 200) {
        reject(err);
      }
      const $ = cheerio.load(body, {
        xml: {
          normalizeWhitespace: false
        }
      });
      const lyrics = $('.lyrics').text();
      resolve(lyrics);
    });
  });
};

export const fetchLyricsFromSource = async page => {
  return await doRequest(page);
};
