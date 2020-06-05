import mongoose from 'mongoose';

const tweetSchema = new mongoose.Schema({
  user: String,
  text: String,
  uuid: String,
});

const Tweet = mongoose.model('Tweet', tweetSchema);

export default Tweet;
