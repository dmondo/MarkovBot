import { Router, Request, Response } from 'express';
import path from 'path';
import Twit from 'twit';
import { saveHistory, findHistory, deleteHistory } from './controllers/tweet';
import getMarkovChains from './controllers/markov';

const twitterConfig = {
  consumer_key: process.env.TWITTER_API_KEY,
  consumer_secret: process.env.TWITTER_API_KEY_SECRET,
  access_token: process.env.TWITTER_ACCESS_TOKEN,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
};

const router = Router();

router.get('/', (req: Request, res: Response): Response => {
  res.sendFile(path.join(__dirname, '..', 'src', 'index.html'));
});

router.get('/twitter/:user', (req: Request, res: Response): Response => {
  const twitter = new Twit(twitterConfig);

  const { user } = req.params;

  twitter.get('statuses/user_timeline', {
    screen_name: user,
    count: 200,
    exclude_replies: false,
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

  const { user, maxId } = req.params;

  twitter.get('statuses/user_timeline', {
    screen_name: user,
    count: 200,
    max_id: maxId,
    exclude_replies: false,
    include_rts: false,
  }, (err: Error, data: any) => {
    if (err) {
      res.sendStatus(500);
    } else {
      res.json(data);
    }
  });
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

router.post('/chains', async (req: Request, res: Response): Response => {
  getMarkovChains(req, res);
});

export default router;
