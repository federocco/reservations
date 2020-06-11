import * as express from 'express';
import * as passport from 'passport';

import { FacebookStrategy } from '../controller/authFacebook.controller';

passport.serializeUser(function(user, done) {
  done(null, user);
});
passport.deserializeUser(function(user, done) {
  done(null, user);
});

passport.use(FacebookStrategy);

const router = express.Router();

router.get(
  '/',
  passport.authenticate('facebook', {
    scope: [
      'business_management',
      'user_friends',
      'user_location',
      'business_management',
    ],
  }),
);

router.get(
  '/callback',
  passport.authenticate('facebook', {
    successRedirect: '/auth/facebook/success',
    failureRedirect: '/auth/facebook/fail',
  }),
);

router.get('/fail', (req, res) => {
  res.send('Failed attempt to login with Facebook');
});

router.get('/success', (req, res) => {
  res
    .status(200)
    .json({ result: null, message: 'Login with Facebook success!' });
});

export default router;
