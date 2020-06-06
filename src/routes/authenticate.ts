import * as express from 'express';
import { loginWithFacebook } from '../controller/authenticate';

const router = express.Router();

// router.get('/', (req, res) => {
//   res.send('Users segment');
// });

router.get('/facebook', loginWithFacebook);

router.get('/facebookLogin', (req, res) => {
  // console.log(req.body);
  res.send('Autenticate from Facebook');
});

// router.post('/add', postAddUser);

export default router;
