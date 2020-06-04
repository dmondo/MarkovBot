import mongoose from 'mongoose';

const markovSchema = new mongoose.Schema({
  user: String,
  model: String,
});

const Markov = mongoose.model('Markov', markovSchema);

export default Markov;
