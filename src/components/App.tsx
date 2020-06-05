import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import buildModel from '../../lib/markovModel';
import generateChain from '../../lib/generateChain';
import { Store } from '../store/Store';

// TODO use react context for state management
// TODO split into different components...
const useStyles = makeStyles({
  root: {
    minWidth: 275,
    maxWidth: 500,
    marginLeft: 5,
    backgroundColor: 'rgb(21, 32, 43)',
    color: 'white',
    borderColor: 'rgb(29, 161, 242)',
    flexGrow: 1,
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
  // TODO: use useEffect hook to load previously liked tweets from db
  const { state, dispatch } = React.useContext(Store);

  const {
    user,
    tweets,
    model,
    ready,
  } = state;
  // const [user, setUser] = useState<string>('');
  // const [tweets, setTweets] = useState<ITweet[]>([]);
  // const [model, setModel] = useState<IModel>({});
  // const [ready, setReady] = useState<boolean>(false);

  const classes = useStyles();

  // TODO: put this logic in lib folder?
  const getTweets = async (query: string): Promise<void> => {
    const fetchModel = await fetch(`/models/${query}`);
    const existingModel = await fetchModel.json();

    if (existingModel.length) {
      const rawModel = existingModel[0].model;
      const parsedModel = JSON.parse(rawModel);
      dispatch({ type: 'MODEL', payload: parsedModel });
      dispatch({ type: 'READY', payload: true });
      // setModel(parsedModel);
      // setReady(true);
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

    dispatch({ type: 'MODEL', payload: tweetModel });
    dispatch({ type: 'READY', payload: true });
    // setModel(tweetModel);
    // setReady(true);

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
    // setReady(false);
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
    // setTweets(newTweets);
  };

  return (
    <>
      <Grid item xs={12}>
        <Grid container justify="flex-start" spacing={2}>
          <Grid item sm={6}>
            <h1>
              Generate a markov model from a user handle
            </h1>
            {/* @ts-ignore */}
            <form onSubmit={handleSubmit} style={{ marginBottom: '10px' }}>
              @
              <input
                type="text"
                value={user}
                // onChange={(e) => setUser(e.target.value)}
                onChange={(e) => dispatch({ type: 'USER', payload: e.target.value })}
                required
              />
              <button type="submit">generate model</button>
              {ready && (
              <button type="button" onClick={makeTweet}>make tweets</button>
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
                        <Button className={classes.btn} size="small">like</Button>
                      </CardActions>
                    </Card>
                  </div>
                ))
              }
            </section>
          </Grid>
          <Grid item sm={6}>
            <br />
            {/* @ts-ignore */}
            <h1 style={{ marginBottom: '10px', marginLeft: '10px' }}>
              popular generated tweets
            </h1>
            <section>
              <Card className={classes.root} variant="outlined">
                <CardContent>
                  <Typography variant="body2" component="p">
                    space! You have about one week left to complete your astronaut application.
                  </Typography>
                  <Typography className={classes.pos} color="textSecondary">
                    nasa
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button className={classes.btn} size="small">remove</Button>
                </CardActions>
              </Card>
              <Card className={classes.root} variant="outlined">
                <CardContent>
                  <Typography variant="body2" component="p">
                    We Will Learn Obama ‘Knew Everything’
                  </Typography>
                  <Typography className={classes.pos} color="textSecondary">
                    realdonaldtrump
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button className={classes.btn} size="small">remove</Button>
                </CardActions>
              </Card>
            </section>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default App;
