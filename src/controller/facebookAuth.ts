import { IUser } from '../database/models';
import { upsertUserAccessToken } from '../controller/user';
import { Strategy } from 'passport-facebook';

export const FacebookStrategy = new Strategy(
  {
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: process.env.FACEBOOK_CALLBACK_URL,
    profileFields: ['id', 'email', 'first_name', 'last_name'],
  },
  async function(accessToken, refreshToken, profile, done) {
    try {
      const { id, email, first_name, last_name } = profile._json;

      const displayName: string = `${first_name}${last_name}`;
      const upsertUser: IUser = {
        email,
        facebookId: id,
        displayName,
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
);
