/* eslint no-unused-vars: 0 */
import { Request, Response } from 'express';
import { saveTweet, findTweets } from '../database/index';

const saveHistory = (req: Request, res: Response): Response => {
  const data = {
    user: req.body.user,
    text: req.body.text,
  };

  saveTweet(data, (err: Error) => {
    if (err) {
      res.sendStatus(500);
    } else {
      res.sendStatus(200);
    }
  });
};

// TODO fix any type, change to async await?
const findHistory = (req: Request, res: Response): Response => {
  findTweets((err: Error, data: any) => {
    if (err) {
      res.sendStatus(500);
    } else {
      res.json(data);
    }
  });
};

export { saveHistory, findHistory };
