import express from 'express';
import session from 'express-session';
import passport from 'passport';
import path from 'path';
import bodyParser from 'body-parser';
import config from '../config/config';
import spotifyAuthInfo from '../config/spotifyAuthInfo';
import { spotifyRouter } from './routes/spotifyAPI';
import { geniusRouter } from './routes/geniusAPI';
const SpotifyStrategy = require('passport-spotify').Strategy;

const app = new express();
app.use(express.static(path.join(__dirname, '../client/build')));
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use(bodyParser.json());

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
      clientID: spotifyAuthInfo.CLIENT_ID,
      clientSecret: spotifyAuthInfo.CLIENT_SECRET,
      callbackURL: 'http://localhost:8888/callback'
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

const port = config.port;
app.listen(port, () =>
  console.log(`Smoretify is listening on port ${port} :)`)
);
