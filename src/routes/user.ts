import * as express from 'express';
import { postAddUser } from '../controller/user';

const router = express.Router();

router.get('/', (req, res) => {
  res.send('Users segment');
});

router.get('/users', (req, res) => {
  console.log(req.body);
  res.send('List of users');
});

router.post('/add', postAddUser);

export default router;
