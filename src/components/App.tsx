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

    setTweets(tweetArray);

    const tweetModel: IModel = buildModel(tweetArray, 3);

    setModel(tweetModel);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    getTweets(user);
  };

  const makeTweet = () => {
    const chain = generateChain(model, 15);
    console.log('chain', chain);
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
