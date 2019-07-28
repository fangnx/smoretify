/**
 * geniusAPI.js
 *
 * @author nxxinf
 * @github https://github.com/fangnx
 * @created 2019-07-14 15:51:33
 * @last-modified 2019-07-27 17:18:30
 */

import express from 'express';
import geniusAuthInfo from '../../config/geniusAuthInfo';
import geniusApi from 'genius-api';

const router = express.Router();
const BASE_URL = 'https://api.genius.com/';
const TOKEN = geniusAuthInfo.ACCESS_TOKEN;
const genius = new geniusApi(TOKEN);

// Get Artist by id.
router.post('/getArtist', (req, res) => {
  genius.artist(req.body.artistId).then(value => res.send(value.artist));
});

// Get Song by id.
router.post('/getSong', (req, res) => {
  genius.song(req.body.songId).then(value => {
    res.send(value.song);
  });
});

// Search by keyword.
router.post('/search', (req, res) => {
  console.log(req.body);
  genius.search(req.body.searchTerm).then(value => res.send(value.hits));
});

export { router as geniusRouter };
