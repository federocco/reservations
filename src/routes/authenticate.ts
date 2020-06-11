import * as express from 'express';
import * as passport from 'passport';

import { FacebookStrategy } from '../controller/facebookAuth';

passport.serializeUser(function(user, done) {
  done(null, user);
});
passport.deserializeUser(function(user, done) {
  done(null, user);
});

passport.use(FacebookStrategy);

const router = express.Router();

router.get(
  '/facebook',
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
  '/facebook/callback',
  passport.authenticate('facebook', {
    successRedirect: '/auth/facebook/success',
    failureRedirect: '/auth/facebook/fail',
  }),
);

router.get('/facebook/fail', (req, res) => {
  res.send('Failed attempt to login with Facebook');
});

router.get('/facebook/success', (req, res) => {
  res
    .status(200)
    .json({ result: null, message: 'Login with Facebook success!' });
});

export default router;
