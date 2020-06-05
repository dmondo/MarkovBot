import React from 'react';
import Grid from '@material-ui/core/Grid';
import Feed from './Feed';
import Form from './Form';
import History from './History';

const App = (): JSX.Element => (
  <>
    <Grid item xs={12}>
      <Grid container justify="flex-start" spacing={2}>
        <Grid item sm={6}>
          <Form />
          <Feed />
        </Grid>
        <Grid item sm={6}>
          <History />
        </Grid>
      </Grid>
    </Grid>
  </>
);

export default App;
