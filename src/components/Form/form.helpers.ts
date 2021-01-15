import { v4 as uuidv4 } from 'uuid';
import generateChain from '../../../lib/generateChain';

const postModel = async (query: string, model: IModel): Promise<Response> => {
  const url = `/models/${query}`;
  const method = 'POST';
  const headers = { 'Content-Type': 'application/json' };
  const body = JSON.stringify(model);
  const options = { method, headers, body };

  return fetch(url, options);
};

const generateTweets = (user: string, tweets: ITweet[], model: IModel): ITweet[] => {
  let newTweets = [...tweets];

  for (let i = 0; i < 10; i += 1) {
    let retries = 30;
    let chain = 'null';
    while (retries > 0
           && chain.split(' ').length < 5
           && chain[chain.length - 1] !== '.'
           && chain[chain.length - 1] !== '!'
           && chain[chain.length - 1] !== '?'
    ) {
      chain = generateChain(model, 25, 2);
      retries -= 1;
    }
    const newTweet = { user, text: chain, uuid: uuidv4() };
    newTweets = [newTweet, ...newTweets];
  }

  return newTweets;
};

export {
  postModel,
  generateTweets,
};
