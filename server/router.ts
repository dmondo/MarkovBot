/* eslint no-unused-vars: 0 */
import { Router, Request, Response } from 'express';
import path from 'path';
import Twit from 'twit';
import twitterConfig from '../lib/config';
import { saveMarkov, findMarkov } from './controllers/markov';
import { saveHistory, findHistory, deleteHistory } from './controllers/tweet';

const router = Router();

router.get('/', (req: Request, res: Response): Response => {
  res.sendFile(path.join(__dirname, '..', 'src', 'index.html'));
});

router.get('/twitter', (req: Request, res: Response): Response => {
  const twitter = new Twit(twitterConfig);

  twitter.get('search/tweets', {
    q: 'banana',
    count: 10,
  }, (err: Error, data: any) => {
    if (err) {
      res.sendStatus(500);
    } else {
      res.json(data);
    }
  });
});

router.get('/twitter/:user', (req: Request, res: Response): Response => {
  const twitter = new Twit(twitterConfig);

  // @ts-ignore
  const { user } = req.params;

  twitter.get('statuses/user_timeline', {
    screen_name: user,
    count: 200,
    exclude_replies: true,
    include_rts: false,
  }, (err: Error, data: any) => {
    if (err) {
      res.sendStatus(500);
    } else {
      res.json(data);
    }
  });
});

router.get('/twitter/:user/:maxId', (req: Request, res: Response): Response => {
  const twitter = new Twit(twitterConfig);

  // @ts-ignore
  const { user, maxId } = req.params;

  twitter.get('statuses/user_timeline', {
    screen_name: user,
    count: 200,
    max_id: maxId,
    exclude_replies: true,
    include_rts: false,
  }, (err: Error, data: any) => {
    if (err) {
      res.sendStatus(500);
    } else {
      res.json(data);
    }
  });
});

router.get('/models/:user', (req: Request, res: Response): Response => {
  const { user } = req.params;
  findMarkov(req, res, user);
});

router.post('/models/:user', (req: Request, res: Response): Response => {
  const { user } = req.params;
  saveMarkov(req, res, user, req.body);
});

router.get('/history', (req: Request, res: Response): Response => {
  findHistory(req, res);
});

router.post('/history', (req: Request, res: Response): Response => {
  saveHistory(req, res);
});

router.delete('/history/:uuid', (req: Request, res: Response): Response => {
  const { uuid } = req.params;
  deleteHistory(req, res, uuid);
});

export default router;
