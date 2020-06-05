import React from 'react';
import { Store } from '../store/Store';
import buildModel from '../../lib/markovModel';
import generateChain from '../../lib/generateChain';

interface IModel {
  [key: string]: string;
}

const Form = (): JSX.Element => {
  const { state, dispatch } = React.useContext(Store);
  const {
    user,
    ready,
    tweets,
    model,
  } = state;

  // TODO: put this logic in lib folder?
  const getTweets = async (query: string): Promise<void> => {
    const fetchModel = await fetch(`/models/${query}`);
    const existingModel = await fetchModel.json();

    if (existingModel.length) {
      const rawModel = existingModel[0].model;
      const parsedModel = JSON.parse(rawModel);
      dispatch({ type: 'MODEL', payload: parsedModel });
      dispatch({ type: 'READY', payload: true });
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

    const tweetModel: IModel = buildModel(tweetArray, 3);

    dispatch({ type: 'MODEL', payload: tweetModel });
    dispatch({ type: 'READY', payload: true });

    const url = `/models/${query}`;
    const method = 'POST';
    const headers = { 'Content-Type': 'application/json' };
    const body = JSON.stringify(tweetModel);
    const options = { method, headers, body };

    fetch(url, options);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    dispatch({ type: 'READY', payload: false });
    getTweets(user);
  };

  const makeTweet = () => {
    let newTweets = [...tweets];
    for (let i = 0; i < 10; i += 1) {
      const chain = generateChain(model, 25, 3);
      const newTweet = { user, text: chain };
      newTweets = [newTweet, ...newTweets];
    }
    dispatch({ type: 'TWEETS', payload: newTweets });
  };

  return (
    <>
      <h1>
        Generate a markov model from a user handle
      </h1>
      {/* @ts-ignore */}
      <form onSubmit={handleSubmit} style={{ marginBottom: '10px' }}>
        @
        <input
          type="text"
          value={user}
          onChange={(e) => dispatch({ type: 'USER', payload: e.target.value })}
          required
        />
        <button type="submit">generate model</button>
        {ready && (
        <button type="button" onClick={makeTweet}>make tweets</button>
        )}
      </form>
    </>
  );
};

export default Form;
