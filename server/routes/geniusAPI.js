/**
 * geniusAPI.js
 *
 * @author nxxinf
 * @github https://github.com/fangnx
 * @created 2019-07-14 15:51:33
 * @last-modified 2019-07-28 14:20:38
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
  genius
    .artist(req.body.artistId)
    .then(value => res.send(value.artist))
    .catch(err => res.status(400).json(err));
});

// Get Song by id.
router.post('/getSong', (req, res) => {
  genius
    .song(req.body.songId)
    .then(value => res.send(value.song))
    .catch(err => res.status(400).json(err));
});

// Get Referentes by songId.
router.post('/getReferentsBySong', (req, res) => {
  genius
    .referents({ song_id: req.body.songId }, { text_format: 'html' })
    .then(value => res.send(value.referents))
    .catch(err => res.status(400).json(err));
});

// Search by keyword.
router.post('/search', (req, res) => {
  console.log(req.body);
  genius
    .search(req.body.searchTerm)
    .then(value => res.send(value.hits))
    .catch(err => res.status(400).json(err));
});

export { router as geniusRouter };
