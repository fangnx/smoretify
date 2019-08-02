/**
 * fetchLyrics.js
 *
 * @author nxxinf
 * @github https://github.com/fangnx
 * @created 2019-08-01 21:38:16
 * @last-modified 2019-08-01 22:05:44
 */

import request from 'request';
import cheerio from 'cheerio';
import URL from 'url-parse';

const targetPage = 'https://genius.com/Franz-ferdinand-take-me-out-lyrics';

const fetchLyricsFromSource = page => {
  request(page, (err, res, body) => {
    if (err) {
      console.log(`Error: ${err}`);
      return '';
    } else if (res.statusCode == 200) {
      const $ = cheerio.load(body, {
        xml: {
          normalizeWhitespace: false
        }
      });
      console.log($('.lyrics').text());
      return $('.lyrics').text();
    }
  });
  return '';
};

fetchLyricsFromSource(targetPage);
