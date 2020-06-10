import * as express from 'express';
import * as passport from 'passport';
import { Strategy as FacebookStrategy } from 'passport-facebook';

import { IUser } from '../database/models';
import { upsertUserAccessToken } from '../controller/user';

passport.serializeUser(function(user, done) {
  done(null, user);
});
passport.deserializeUser(function(user, done) {
  done(null, user);
});

passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_APP_ID,
      clientSecret: process.env.FACEBOOK_APP_SECRET,
      callbackURL: process.env.FACEBOOK_CALLBACK_URL,
      profileFields: ['id', 'email', 'first_name', 'last_name'],
    },
    async function(accessToken, refreshToken, profile, done) {
      try {
        const { email, first_name, last_name } = profile._json;

        console.log(profile);

        const displayName: string = `${first_name}${last_name}`;
        const upsertUser: IUser = {
          displayName,
          email,
          firstName: first_name ?? '',
          lastName: last_name ?? '',
          facebookAccessToken: accessToken,
        };

        await upsertUserAccessToken(upsertUser);

        done(null, profile);
      } catch (e) {
        console.log(e);
      }
    },
  ),
);

const router = express.Router();

router.get('/facebook', passport.authenticate('facebook'));

router.get(
  '/facebook/callback',
  passport.authenticate('facebook', {
    successRedirect: '/',
    failureRedirect: '/fail',
  }),
);

router.get('/fail', (req, res) => {
  res.send('Failed attempt');
});

router.get('/', (req, res) => {
  res.send('Success');
});

export default router;
