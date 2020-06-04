/* eslint no-unused-vars: 0 */
import { Request, Response } from 'express';
import { save, find } from '../database/index';

const saveMarkov = (req: Request, res: Response, user: string, body: string): Response => {
  const data = {
    user,
    model: JSON.stringify(body),
  };

  save(data, (err: Error) => {
    if (err) {
      res.sendStatus(500);
    } else {
      res.sendStatus(200);
    }
  });
};

const findMarkov = (req: Request, res: Response, user: string): Response => {
  find(user, (err: Error, data: any) => {
    if (err) {
      res.sendStatus(500);
    } else {
      res.json(data);
    }
  });
};

export { saveMarkov, findMarkov };
