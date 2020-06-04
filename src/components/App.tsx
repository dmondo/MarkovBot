import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import buildModel from '../../lib/markovModel';
import generateChain from '../../lib/generateChain';
// import '../styles/App.css';

// TODO use react context for state management
const useStyles = makeStyles({
  root: {
    minWidth: 275,
    maxWidth: 500,
    marginLeft: 5,
    backgroundColor: 'rgb(21, 32, 43)',
    color: 'white',
    borderColor: 'rgb(29, 161, 242)',
  },
  title: {
    fontSize: 14,
    color: 'white',
  },
  pos: {
    marginBottom: 0,
    color: 'white',
  },
  btn: {
    marginTop: 0,
    color: 'white',
  },
});

interface ITweet {
  user: string;
  text: string;
}

interface IModel {
  [key: string]: string;
}

const App = (): JSX.Element => {
  const [user, setUser] = useState<string>('');
  const [tweets, setTweets] = useState<ITweet[]>([]);
  const [model, setModel] = useState<IModel>({});
  const [ready, setReady] = useState<boolean>(false);

  const classes = useStyles();

  // TODO: put this logic in lib folder?
  const getTweets = async (query: string): Promise<void> => {
    const fetchModel = await fetch(`/models/${query}`);
    const existingModel = await fetchModel.json();

    if (existingModel.length) {
      const rawModel = existingModel[0].model;
      const parsedModel = JSON.parse(rawModel);
      setModel(parsedModel);
      setReady(true);
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
    // setTweets(tweetArray);

    const tweetModel: IModel = buildModel(tweetArray, 3);

    setModel(tweetModel);
    setReady(true);

    const url = `/models/${query}`;
    const method = 'POST';
    const headers = { 'Content-Type': 'application/json' };
    const body = JSON.stringify(tweetModel);
    const options = { method, headers, body };

    fetch(url, options);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    setReady(false);
    getTweets(user);
  };

  const makeTweet = () => {
    let newTweets = [...tweets];
    for (let i = 0; i < 10; i += 1) {
      const chain = generateChain(model, 25, 3);
      const newTweet = { user, text: chain };
      newTweets = [newTweet, ...newTweets];
    }
    setTweets(newTweets);
  };

  return (
    <>
      <h1>Tweets</h1>
      <form onSubmit={handleSubmit}>
        @
        <input
          type="text"
          value={user}
          onChange={(e) => setUser(e.target.value)}
          required
        />
        <button type="submit">generate model</button>
        {ready && (
        <button type="button" onClick={makeTweet}>make tweet</button>
        )}
      </form>
      <section>
        {
          tweets.map((twt: ITweet) => (
            <div key={twt.text}>
              <Card className={classes.root} variant="outlined">
                <CardContent>
                  <Typography variant="body2" component="p">
                    {twt.text}
                  </Typography>
                  <Typography className={classes.pos} color="textSecondary">
                    {twt.user}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button className={classes.btn} size="small">hide</Button>
                </CardActions>
              </Card>
            </div>
          ))
        }
      </section>
    </>
  );
};

export default App;
