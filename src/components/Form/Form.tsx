import React from 'react';
import { Store } from '../../store/Store';
import buildModel from '../../../lib/markovModel';
import TweetToModel from '../../../lib/TweetToModel';
import Loader from '../Loader/Loader';
import { postModel, generateTweets } from './form.helpers';

const Form = (): JSX.Element => {
  const { state, dispatch } = React.useContext(Store);
  const {
    user,
    ready,
    tweets,
    model,
    loading,
  } = state;

  const getTweets = async (query: string): Promise<void> => {
    const fetchModel = await fetch(`/models/${query}`);
    const existingModel = await fetchModel.json();

    if (existingModel.length) {
      const rawModel = existingModel[0].model;
      const parsedModel = JSON.parse(rawModel);
      dispatch({ type: 'MODEL', payload: parsedModel });
      dispatch({ type: 'READY', payload: true });
      dispatch({ type: 'LOADING', payload: false });
      return;
    }

    const tweetArray = await TweetToModel(query);

    const tweetModel: IModel = buildModel(tweetArray, 2);

    dispatch({ type: 'MODEL', payload: tweetModel });
    // TODO: move to useState in parent
    dispatch({ type: 'READY', payload: true });
    dispatch({ type: 'LOADING', payload: false });

    await postModel(query, tweetModel);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    dispatch({ type: 'READY', payload: false });
    getTweets(user);
  };

  const makeTweet = () => {
    const newTweets = generateTweets(user, tweets, model);
    dispatch({ type: 'TWEETS', payload: newTweets });
  };

  const loadBar = () => {
    // TODO: move to useState in parent
    dispatch({ type: 'LOADING', payload: true });
  };

  return (
    <>
      <h1>
        Generate a markov model from a user handle
      </h1>
      <form onSubmit={handleSubmit} style={{ marginBottom: '10px' }}>
        @
        <input
          type="text"
          value={user}
          onChange={(e) => dispatch({ type: 'USER', payload: e.target.value })}
          required
        />
        <button type="submit" onClick={loadBar}>generate model</button>
        {loading && (
          <Loader />
        )}
        {ready && (
          <button type="button" onClick={makeTweet}>make tweets</button>
        )}
      </form>
    </>
  );
};

export default Form;
