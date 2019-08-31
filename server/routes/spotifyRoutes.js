/**
 * spotifyRoutes.js
 *
 * @author nxxinf
 * @github https://github.com/fangnx
 * @created 2019-08-30 17:48:38
 * @last-modified 2019-08-31 18:00:25
 */

import express from 'express';
import request from 'request';
import spotifyAuthInfo from '../../config/spotifyAuthInfo';

const router = express.Router();
const CLIENT_ID = spotifyAuthInfo.CLIENT_ID;
const CLIENT_SECRET = spotifyAuthInfo.CLIENT_SECRET;

//
router.get('/auth_info', (req, res) => {
  if (req.isAuthenticated()) {
    res.json(req.user);
  } else {
    res.json({ error: 'Not Authenticated yet.' });
  }
});

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
      // Update user's access token.
      if (req.user) {
        req.user.accessToken = body.access_token;
      }
      res.send({
        access_token: body.access_token
      });
    }
  });
});

export { router as spotifyRouter };
