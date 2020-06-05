import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

// TODO refactor styles into own file
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

const History = (): JSX.Element => {
  const classes = useStyles();
  return (
    <>
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
    </>
  );
};

export default History;
