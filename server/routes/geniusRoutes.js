/**
 * geniusRoutes.js
 *
 * @author nxxinf
 * @github https://github.com/fangnx
 * @created 2019-07-14 15:51:33
 * @last-modified 2019-08-31 18:00:31
 */

import express from 'express';
import geniusAuthInfo from '../../config/geniusAuthInfo';
import geniusApi from 'genius-api';
import { fetchLyricsFromSource } from '../fetchLyrics';

const router = express.Router();
const BASE_URL = 'https://api.genius.com/';
const TOKEN = geniusAuthInfo.ACCESS_TOKEN;
const genius = new geniusApi(TOKEN);

// Get Artist by id.
router.post('/get_artist', (req, res) => {
  genius
    .artist(req.body.artistId, { text_format: 'html' })
    .then(value => res.send(value.artist))
    .catch(err => res.status(400).json(err));
});

// Get Song by id.
router.post('/get_song', (req, res) => {
  genius
    .song(req.body.songId, { text_format: 'html' })
    .then(value => res.send(value.song))
    .catch(err => res.status(400).json(err));
});

// Get Referents by songId.
router.post('/get_referents_by_song', (req, res) => {
  genius
    .referents({ song_id: req.body.songId }, { text_format: 'html' })
    .then(value => res.send(value.referents))
    .catch(err => res.status(400).json(err));
});

// Search by keyword.
router.post('/search', (req, res) => {
  genius
    .search(req.body.searchTerm)
    .then(value => res.send(value.hits))
    .catch(err => res.status(400).json(err));
});

// Get lyrics fetched from Genius by page URL.
router.post('/get_lyrics', async (req, res) => {
  const lyrics = await fetchLyricsFromSource(req.body.url);
  if (lyrics) {
    res.send({ songLyrics: lyrics });
  } else {
    res
      .status(400)
      .json({ songLyrics: 'Lyrics from Genius.com temporarily unavailable' });
  }
});

export { router as geniusRouter };
