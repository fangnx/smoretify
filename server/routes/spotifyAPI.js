/**
 * spotifyAPI.js
 *
 * @author nxxinf
 * @github https://github.com/fangnx
 * @created 2019-08-30 17:48:38
 * @last-modified 2019-08-31 00:00:30
 */

import express from 'express';
import request from 'request';
import spotifyAuthInfo from '../../config/spotifyAuthInfo';

const router = express.Router();
const CLIENT_ID = spotifyAuthInfo.CLIENT_ID;
const CLIENT_SECRET = spotifyAuthInfo.CLIENT_SECRET;

router.get('/refresh_token', (req, res) => {
  const token = req.query.token;
  const options = {
    url: 'https://accounts.spotify.com/api/token',
    headers: {
      Authorization:
        'Basic ' +
        new Buffer(CLIENT_ID + ':' + CLIENT_SECRET).toString('base64')
    },
    form: {
      grant_type: 'refresh_token',
      refresh_token: token
    },
    json: true
  };

  request.post(options, (err, response, body) => {
    if (!err && response.statusCode === 200) {
      res.send({
        access_token: body.access_token
      });
    }
  });
});

export { router as spotifyRouter };
