import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Feed from './Feed/Feed';
import Form from './Form/Form';
import History from './History/History';

const App = (): JSX.Element => {
  const [loading, setLoading] = useState(false);

  const handleLoading = (isLoading: boolean) => {
    setLoading(isLoading);
  };

  return (
    <Grid item xs={12}>
      <Grid container justify="flex-start" spacing={2}>
        <Grid item sm={6}>
          <Form loading={loading} handleLoading={handleLoading} />
          <Feed />
        </Grid>
        <Grid item sm={6}>
          <History />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default App;
