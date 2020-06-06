import { Request, Response, NextFunction } from 'express';
import { User, IUser } from '../database/models';

export const postAddUser = async (
  req: Request,
  res: Response,
  __: NextFunction,
) => {
  try {
    const iUser: IUser = {
      displayName: req.body.displayName,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
    };
    const newUser = await User.create(iUser);

    res.status(newUser ? 200 : 404).json(newUser ? { result: newUser } : null);
  } catch (e) {
    res.status(500).send({ errorMessage: e.message, errors: e.errors });
  }
};
