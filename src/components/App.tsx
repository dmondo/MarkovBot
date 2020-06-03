import React, { useState, useEffect } from 'react';
// import ReactDOM from 'react-dom';

interface ITweet {
  user: string;
  text: string;
  id: number;
}

const App = (): JSX.Element => {
  const [user, setUser] = useState<string>('');
  const [tweets, setTweets] = useState<ITweet[]>([]);

  useEffect(() => {
    // TODO: temp, remove later
    fetch('/twitter')
      .then((data) => data.json())
      .then((twts) => {
        setTweets(twts.statuses.map((twt: any) => (
          {
            user: twt.user.name,
            text: twt.text,
            id: twt.id,
          }
        )));
      });
  }, []);

  const getTweets = async (query: string): Promise<void> => {
    const res = await fetch(`/twitter/${query}`);
    const twts = await res.json();
    setTweets(twts.statuses.map((twt: any) => (
      {
        user: twt.user.name,
        text: twt.text,
        id: twt.id,
      }
    )));
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
