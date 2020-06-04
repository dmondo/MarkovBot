import React, { useState } from 'react';
import buildModel from '../../lib/markovModel';
import generateChain from '../../lib/generateChain';

interface ITweet {
  user: string;
  text: string;
  id: string;
}

interface IModel {
  [key: string]: string;
}

const App = (): JSX.Element => {
  const [user, setUser] = useState<string>('');
  const [tweets, setTweets] = useState<ITweet[]>([]);
  const [model, setModel] = useState<IModel>({});

  const getTweets = async (query: string): Promise<void> => {
    const fetchModel = await fetch(`/models/${query}`);
    const existingModel = await fetchModel.json();

    if (existingModel.length) {
      const rawModel = existingModel[0].model;
      const parsedModel = JSON.parse(rawModel);
      setModel(parsedModel);
      return;
    }

    // model for user doesn't exist, fetch tweets and build
    let tweetArray = [];
    const res = await fetch(`/twitter/${query}`);
    const twts = await res.json();

    const moreTweets = twts.map((twt: any) => (
      {
        user: twt.user.name,
        text: twt.text,
        id: twt.id_str,
      }
    ));

    tweetArray = [...tweetArray, ...moreTweets];

    for (let i = 0; i < 18; i += 1) {
      const maxId = tweetArray[tweetArray.length - 1].id;

      // ignore linter because we need blocking between iterations
      /* eslint no-await-in-loop: 0 */
      const nres = await fetch(`/twitter/${query}/${maxId}`);
      const ntwts = await nres.json();

      const nmoreTweets = ntwts.map((twt: any) => (
        {
          user: twt.user.name,
          text: twt.text,
          id: twt.id_str,
        }
      ));

      tweetArray = [...tweetArray, ...nmoreTweets.slice(1)];
    }

    // todo: tweetArray should actually be markov generated
    // tweets, NOT tweets from twitter api...
    setTweets(tweetArray);

    const tweetModel: IModel = buildModel(tweetArray, 3);

    setModel(tweetModel);

    const url = `/models/${query}`;
    const method = 'POST';
    const headers = { 'Content-Type': 'application/json' };
    const body = JSON.stringify(tweetModel);
    const options = { method, headers, body };

    fetch(url, options);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    getTweets(user);
  };

  // TODO: only render makeTweet button after model is generated
  const makeTweet = () => {
    console.log('model', model);
    const chain = generateChain(model, 15);
    console.log('chain:', chain);
  };

  return (
    <>
      <h1>Tweets</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={user}
          onChange={(e) => setUser(e.target.value)}
          required
        />
        <button type="submit">generate model</button>
      </form>
      <button type="button" onClick={makeTweet}>make tweet</button>
      <section>
        {
          tweets.map((twt: ITweet) => (
            <div key={twt.id}>{twt.text}</div>
          ))
        }
      </section>
    </>
  );
};

export default App;
