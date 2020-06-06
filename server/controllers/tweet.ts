/* eslint no-unused-vars: 0 */
import { Request, Response } from 'express';
import { saveTweet, findTweets, deleteTweet } from '../database/index';

const saveHistory = (req: Request, res: Response): Response => {
  const data = {
    user: req.body.user,
    text: req.body.text,
    uuid: req.body.uuid,
  };

  saveTweet(data, (err: Error) => {
    if (err) {
      res.sendStatus(500);
    } else {
      res.sendStatus(200);
    }
  });
};

const findHistory = (req: Request, res: Response): Response => {
  findTweets((err: Error, data: ITweet) => {
    if (err) {
      res.sendStatus(500);
    } else {
      res.json(data);
    }
  });
};

const deleteHistory = (req: Request, res: Response, uuid: string): Response => {
  deleteTweet(uuid, (err: Error) => {
    if (err) {
      res.sendStatus(500);
    } else {
      res.sendStatus(200);
    }
  });
};

export { saveHistory, findHistory, deleteHistory };
