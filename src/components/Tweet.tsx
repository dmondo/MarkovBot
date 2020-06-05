import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Store } from '../store/Store';

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

const Tweet = ({ twt }): JSX.Element => {
  const classes = useStyles();

  const { dispatch } = React.useContext(Store);

  const saveTweet = () => {
    const url = '/history';
    const method = 'POST';
    const headers = { 'Content-Type': 'application/json' };
    const body = JSON.stringify(twt);
    const options = { method, headers, body };
    (async () => {
      await fetch(url, options);
      const dbdata = await fetch('/history');
      const mongooseHistory = await dbdata.json();

      const parsedHistory = mongooseHistory.map((hist) => (
        {
          user: hist.user,
          text: hist.text,
          uuid: hist.uuid,
        }
      ));

      dispatch({ type: 'HISTORY', payload: parsedHistory });
    })();
  };

  return (
    <>
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
            onClick={() => saveTweet()}
          >
            like
          </Button>
        </CardActions>
      </Card>
    </>
  );
};

Tweet.propTypes = {
  twt: PropTypes.shape({
    user: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
  }).isRequired,
};

export default Tweet;
