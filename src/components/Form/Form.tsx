import React from 'react';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';
import { Store } from '../../store/Store';
import TweetToModel from '../../../lib/TweetToModel';
import Loader from '../Loader/Loader';
import fetchChains from './form.helpers';

const Form = ({ loading, handleLoading }): JSX.Element => {
  const { state, dispatch } = React.useContext(Store);
  const {
    user,
  } = state;

  const getTweets = async (query: string): Promise<void> => {
    const tweetArray = await TweetToModel(query);

    const chains = await fetchChains(tweetArray);
    const formattedTweets = chains.map((chain: string[]) => ({
      user,
      text: chain,
      uuid: uuidv4(),
    }));

    dispatch({ type: 'TWEETS', payload: formattedTweets });
    dispatch({ type: 'READY', payload: true });
    handleLoading(false);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    dispatch({ type: 'READY', payload: false });
    getTweets(user);
  };

  const loadBar = () => {
    handleLoading(true);
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
        <button type="submit" onClick={loadBar}>make some tweets!</button>
        {loading && (
          <Loader />
        )}
      </form>
    </>
  );
};

Form.propTypes = {
  loading: PropTypes.bool.isRequired,
  handleLoading: PropTypes.func.isRequired,
};

export default Form;
