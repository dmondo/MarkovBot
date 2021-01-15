import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { postTweetToHistory, deleteTweetFromHistory } from './tweet.helpers';
import getParsedHistory from '../../helpers/components.helpers';
import { Store } from '../../store/Store';

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

const Tweet = ({ twt, status }): JSX.Element => {
  const classes = useStyles();

  const { dispatch } = React.useContext(Store);

  const saveTweet = async () => {
    // TODO: refactor without iif
    (async () => {
      await postTweetToHistory(twt);
      const parsedHistory = await getParsedHistory();
      dispatch({ type: 'HISTORY', payload: parsedHistory });
    })();
  };

  const deleteTweet = async () => {
    // TODO: refactor without iif
    (async () => {
      await deleteTweetFromHistory(twt.uuid);
      const parsedHistory = await getParsedHistory();
      dispatch({ type: 'HISTORY', payload: parsedHistory });
    })();
  };

  const handleTweet = () => (
    (status === 'like') ? saveTweet() : deleteTweet()
  );

  return (
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
        <Button
          className={classes.btn}
          size="small"
          onClick={() => handleTweet()}
        >
          {status}
        </Button>
      </CardActions>
    </Card>
  );
};

Tweet.propTypes = {
  twt: PropTypes.shape({
    user: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    uuid: PropTypes.string.isRequired,
  }).isRequired,
  status: PropTypes.string.isRequired,
};

export default Tweet;
