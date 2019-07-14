import express from 'express';
import passport from 'passport';
import config from '../config/config';
import spotifyAuthInfo from '../config/spotifyAuthInfo';

const SpotifyStrategy = require('passport-spotify').Strategy;

const app = new express();

// Passport.js setup.
passport.use(
  new SpotifyStrategy(
    {
      clientID: spotifyAuthInfo.CLIENT_ID,
      clientSecret: spotifyAuthInfo.CLIENT_SECRET,
      callbackURL: 'http://localhost:8888/auth/spotify/callback'
    },
    (accessToken, refreshToken, expires_in, profile, done) => {
      console.log(accessToken);
      return done(err, user);
    }
  )
);

app.use(passport.initialize());
app.use(passport.session());

const port = config.port;
app.listen(port, () => console.log(`App listening on port ${port} !`));
