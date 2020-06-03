import React, { useState } from 'react';
import buildModel from '../../lib/markovModel';
import generateChain from '../../lib/generateChain';
// import ReactDOM from 'react-dom';

interface ITweet {
  user: string;
  text: string;
  id: string;
}

const App = (): JSX.Element => {
  const [user, setUser] = useState<string>('');
  const [tweets, setTweets] = useState<ITweet[]>([]);

  // useEffect(() => {
  //   // TODO: temp, remove later
  //   fetch('/twitter')
  //     .then((data) => data.json())
  //     .then((twts) => {
  //       setTweets(twts.statuses.map((twt: any) => (
  //         {
  //           user: twt.user.name,
  //           text: twt.text,
  //           id: twt.id,
  //         }
  //       )));
  //     });
  // }, []);

  const getTweets = async (query: string): Promise<void> => {
    let tweetArray = [];
    const res = await fetch(`/twitter/${query}`);
    const twts = await res.json();

    console.log('twts', twts);

    const moreTweets = twts.map((twt: any) => (
      {
        user: twt.user.name,
        text: twt.text,
        id: twt.id_str,
      }
    ));

    tweetArray = [...tweetArray, ...moreTweets];

    const maxId = tweetArray[tweetArray.length - 1].id;

    console.log('maxId', maxId);

    const nres = await fetch(`/twitter/${query}/${maxId}`);
    const ntwts = await nres.json();

    console.log('ntwts', ntwts);

    const nmoreTweets = ntwts.map((twt: any) => (
      {
        user: twt.user.name,
        text: twt.text,
        id: twt.id_str,
      }
    ));

    console.log('nmoreTweets', nmoreTweets);

    tweetArray = [...tweetArray, ...nmoreTweets.slice(1)];

    setTweets(tweetArray);

    const model = buildModel(tweetArray, 3);
    console.log(model);
    const chain = generateChain(model, 15); // need to check if length < max tweet length
    console.log('chain', chain);
    // then: render some sort of loading/processing indication to screen
    // build markov model
    // finally, render generated tweet to screen
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    getTweets(user);
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
