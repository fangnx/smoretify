import express from 'express';
import session from 'express-session';
import passport from 'passport';
import path from 'path';
import config from '../config/config';
import spotifyAuthInfo from '../config/spotifyAuthInfo';

const SpotifyStrategy = require('passport-spotify').Strategy;

const app = new express();
app.use(express.static(path.join(__dirname, '../client/build')));

// Passport.js session setup.
passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

// Passport.js Spotify authentification
passport.use(
  new SpotifyStrategy(
    {
      clientID: spotifyAuthInfo.CLIENT_ID,
      clientSecret: spotifyAuthInfo.CLIENT_SECRET,
      callbackURL: 'http://localhost:8888/callback'
    },
    (accessToken, refreshToken, expires_in, profile, done) => {
      console.log(profile);
      return done(null, profile);
    }
  )
);

app.use(
  session({ secret: 'hashbrown', resave: true, saveUninitialized: true })
);
app.use(passport.initialize());
app.use(passport.session());

// Directs to the authentification page of Spotify.com.
// Redirects back to /callback on successful login.
app.get(
  '/auth/spotify',
  passport.authenticate('spotify', {
    scope: ['user-read-email', 'user-read-private'],
    showDialog: true
  }),
  (req, res) => {}
);

app.get(
  '/callback',
  passport.authenticate('spotify', { failureRedirect: '/' }),
  (req, res) => {
    res.redirect('/');
  }
);

app.get('/info', (req, res) => {
  console.log(req.isAuthenticated());
});

function checkIsSpotifyAuthenticated(req, res) {
  if (req.isAuthenticated()) {
    // console.log(req.user);
  }
  //   return;
}

const port = config.port;
app.listen(port, () => console.log(`App listening on port ${port} !`));
