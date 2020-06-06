import React, { useEffect } from 'react';
import { Store } from '../store/Store';
import Tweet from './Tweet';

const History = (): JSX.Element => {
  const { state, dispatch } = React.useContext(Store);
  const { history } = state;

  useEffect(() => {
    (async () => {
      const data = await fetch('/history');
      const mongooseHistory = await data.json();

      const parsedHistory = mongooseHistory.map((twt) => (
        {
          user: twt.user,
          text: twt.text,
          uuid: twt.uuid,
        }
      ));

      dispatch({ type: 'HISTORY', payload: parsedHistory });
    })();
  }, []);

  console.log('history', history);

  return (
    <>
      <br />
      <h1 style={{ marginBottom: '10px', marginLeft: '10px' }}>
        popular generated tweets
      </h1>
      <section>
        {
          history.map((twt) => (
            <Tweet twt={twt} key={twt.uuid} />
          ))
        }
      </section>
    </>
  );
};

export default History;
