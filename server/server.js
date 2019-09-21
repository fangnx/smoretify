/**
 * server.js
 *
 * @author nxxinf
 * @github https://github.com/fangnx
 * @created 2019-07-14 11:17:55
 * @last-modified 2019-09-20 22:24:36
 */

import express from 'express';
import session from 'express-session';
import passport from 'passport';
import { spotifyRouter } from './routes/spotifyRoutes';
import { geniusRouter } from './routes/geniusRoutes';
import bodyParser from 'body-parser';
import path from 'path';
require('dotenv').config();
const SpotifyStrategy = require('passport-spotify').Strategy;

const app = new express();

app.use('/', express.static(path.resolve(__dirname + './../client/build')));
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use(bodyParser.json());

// App environment config.
const host = process.env.HOST || 'localhost';
const port = process.env.PORT || 8888;
const clientID = process.env.SPOTIFY_CLIENT_ID;
const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
const callbackURL =
  process.env.NODE_ENV === 'heroku'
    ? 'https://smoretify.herokuapp.com/callback'
    : `http://${host}:${port}/callback`;

// Passport.js session setup.
passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((obj, done) => {
  done(null, obj);
});

// Passport.js Spotify authentication.
passport.use(
  new SpotifyStrategy(
    {
      clientID,
      clientSecret,
      callbackURL
    },
    (accessToken, refreshToken, expires_in, profile, done) => {
      profile.accessToken = accessToken;
      profile.refreshToken = refreshToken;
      profile.expiresIn = expires_in;
      return done(null, profile);
    }
  )
);

app.use(
  session({ secret: 'hashbrown', resave: true, saveUninitialized: true })
);
app.use(passport.initialize());
app.use(passport.session());

// Direct to the authentication page of Spotify.
// On successful login, redirect back to /callback.
app.get(
  '/auth/spotify',
  passport.authenticate('spotify', {
    scope: [
      'user-read-email',
      'user-read-private',
      'user-modify-playback-state',
      'user-top-read',
      'user-read-playback-state',
      'user-read-currently-playing',
      'user-read-recently-played'
    ],
    showDialog: true
  }),
  (req, res) => {}
);

app.get(
  '/callback',
  passport.authenticate('spotify', { failureRedirect: '/auth/spotify' }),
  (req, res) => {
    res.redirect('/');
  }
);

const isSpotifyAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/auth/spotify');
};

// API routes.
app.use('/api/spotify', spotifyRouter);
app.use('/api/genius', geniusRouter);

app.listen(port, () =>
  console.log(`Smoretify is running on http://${host}:${port}/\nEnjoy music :)`)
);
