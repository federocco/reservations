import { Request, Response, NextFunction } from 'express';
import * as url from 'url';
import axios from 'axios';

async function getAccessTokenFromCode(code) {
  try {
    const { data } = await axios({
      url: 'https://graph.facebook.com/v7.0/oauth/access_token',
      method: 'get',
      params: {
        client_id: process.env.FACEBOOK_APP_ID,
        client_secret: process.env.FACEBOOK_APP_SECRET,
        redirect_uri: 'http://localhost:3030/authenticate/facebook',
        code,
      },
    });
    //   console.log(data); // { access_token, token_type, expires_in }
    return data.access_token;
  } catch (e) {
    console.error(e);
  }
}

async function getFacebookUserData(access_token) {
  try {
    const { data } = await axios({
      url: 'https://graph.facebook.com/me',
      method: 'get',
      params: {
        fields: ['id', 'email', 'first_name', 'last_name'].join(','),
        access_token,
      },
    });
    console.log(data); // { id, email, first_name, last_name }
    return data;
  } catch (e) {
    console.error(e);
  }
}

export const loginWithFacebook = async (
  req: Request,
  res: Response,
  __: NextFunction,
) => {
  try {
    const queryData = url.parse(req.url, true).query;
    const accessToken = await getAccessTokenFromCode(queryData.code);
    console.log('The accessToken is:', accessToken);

    const facebookUserData = await getFacebookUserData(accessToken);
    console.log('The facebookUserData is: ', facebookUserData);

    res.status(200).send(`Facebook login complete successfully!`);
  } catch (e) {
    console.log(e);
    res.status(500).send('something went wrong on login with Facebook');
  }
};
