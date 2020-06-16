import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Markov from './models/markov';
import Tweet from './models/tweets';

dotenv.config();
const {
  MONGO_HOSTNAME,
  MONGO_DB,
  MONGO_PORT,
} = process.env;

const cnxs = {
  PROD: `mongodb://${MONGO_HOSTNAME}:${MONGO_PORT}/${MONGO_DB}`,
  DEV: 'mongodb://localhost/fetcher',
};

const cnx = cnxs.PROD;

mongoose.connect(cnx, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

const saveModel = async (data: IDBModel, callback: Function): Promise<void> => {
  let markov = new Markov();
  markov = Object.assign(markov, data);

  try {
    const saved = await markov.save();
    callback(null, saved);
  } catch (err) {
    callback(err);
  }
};

const findModel = async (user: string, callback: Function): Promise<void> => {
  try {
    const found = await Markov.find({ user });
    callback(null, found.map((doc: any) => doc.toObject()));
  } catch (err) {
    callback(err);
  }
};

const saveTweet = async (data: ITweet, callback: Function): Promise<void> => {
  const found = await Tweet.find({ user: data.user, text: data.text, uuid: data.uuid });

  if (found.length) { return; }

  let tweet = new Tweet();
  tweet = Object.assign(tweet, data);

  try {
    await tweet.save();
    callback(null, 'success');
  } catch (err) {
    callback(err);
  }
};

const findTweets = async (callback: Function): Promise<void> => {
  try {
    const found = await Tweet.find({});
    callback(null, found.map((doc: any) => doc.toObject()));
  } catch (err) {
    callback(err);
  }
};

const deleteTweet = async (data: string, callback: Function): Promise<void> => {
  try {
    await Tweet.findOneAndDelete({ uuid: data });
    callback(null, 'success');
  } catch (err) {
    callback(err);
  }
};

export {
  saveModel,
  findModel,
  saveTweet,
  findTweets,
  deleteTweet,
};
