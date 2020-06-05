import mongoose from 'mongoose';
import Markov from './models/markov';
import Tweet from './models/tweets';

const cnx = process.env.MONGODB || 'mongodb://localhost/fetcher';

mongoose.connect(cnx);

interface IModel {
  user: string;
  model: string;
}

interface ITweet {
  user: string;
  text: string;
}

// TODO refactor all to async await
// TODO change return type from any
// TODO: if user exists in db, overwrite instead
const saveModel = (data: IModel, callback: Function): void => {
  let markov = new Markov();
  markov = Object.assign(markov, data);

  markov.save()
    .then(() => callback(null, 'success'))
    .catch((err: Error) => callback(err));
};

const findModel = (user: string, callback: Function): any => {
  Markov.find({ user })
    .then((data: any) => callback(null, data.map((doc: any) => doc.toObject())))
    .catch((err: Error) => callback(err));
};

const saveTweet = (data: ITweet, callback: Function): void => {
  let tweet = new Tweet();
  tweet = Object.assign(tweet, data);

  tweet.save()
    .then(() => callback(null, 'success'))
    .catch((err: Error) => callback(err));
};

const findTweets = (callback: Function): any => {
  Tweet.find({})
    .then((data: any) => callback(null, data.map((doc: any) => doc.toObject())))
    .catch((err: Error) => callback(err));
};

export {
  saveModel,
  findModel,
  saveTweet,
  findTweets,
};
