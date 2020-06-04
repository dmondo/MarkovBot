import mongoose from 'mongoose';
import Markov from './models/markov';

const cnx = process.env.MONGODB || 'mongodb://localhost/fetcher';

mongoose.connect(cnx);

interface IModel {
  user: string;
  model: string;
}

// TODO: if user exists in db, overwrite instead
const save = (data: IModel, callback: Function): void => {
  let markov = new Markov();
  markov = Object.assign(markov, data);

  markov.save()
    .then(() => callback(null, 'success'))
    .catch((err: Error) => callback(err));
};

const find = (user: string, callback: Function): any => {
  Markov.find({ user })
    .then((data: any) => callback(null, data.map((doc: any) => doc.toObject())))
    .catch((err: Error) => callback(err));
};

export { save, find };
