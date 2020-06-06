import React from 'react';
import { Store } from '../store/Store';
import Tweet from './Tweet';

const Feed = (): JSX.Element => {
  const { state } = React.useContext(Store);
  const { tweets } = state;
  return (
    <>
      <section>
        {
          tweets.map((twt) => (
            <Tweet twt={twt} key={twt.uuid} />
          ))
        }
      </section>
    </>
  );
};

export default Feed;
