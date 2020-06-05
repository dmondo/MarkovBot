import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Store } from '../store/Store';
import buildModel from '../../lib/markovModel';
import generateChain from '../../lib/generateChain';
import TweetToModel from '../../lib/TweetToModel';

const Form = (): JSX.Element => {
  const { state, dispatch } = React.useContext(Store);
  const {
    user,
    ready,
    tweets,
    model,
  } = state;

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

    const tweetArray = await TweetToModel(query);

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
      // uuid HERE
      const newTweet = { user, text: chain, uuid: uuidv4() };
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
