import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Tweet from './models/tweets';

dotenv.config();

const cnx = process.env.DATABASE_URL;

mongoose.connect(cnx, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

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
  saveTweet,
  findTweets,
  deleteTweet,
};
