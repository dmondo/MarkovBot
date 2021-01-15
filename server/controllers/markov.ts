import { Request, Response } from 'express';
import { saveModel, findModel } from '../database/index';

const saveMarkov = (req: Request, res: Response, user: string, body: string): Response => {
  const data = {
    user,
    model: JSON.stringify(body),
  };

  saveModel(data, (err: Error) => {
    if (err) {
      res.sendStatus(500);
    } else {
      res.sendStatus(200);
    }
  });
};

const findMarkov = (req: Request, res: Response, user: string): Response => {
  findModel(user, (err: Error, data: IModel) => {
    if (err) {
      res.sendStatus(500);
    } else {
      res.json(data);
    }
  });
};

export { saveMarkov, findMarkov };
