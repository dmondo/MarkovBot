import React from 'react';
import { css } from '@emotion/core';
import BeatLoader from 'react-spinners/BeatLoader';
import { Store } from '../../store/Store';

const override = css`
  display: block;
  margin: 0 auto;
  border-color: black;
`;

const Loader = () => {
  const { state } = React.useContext(Store);
  const { loading } = state;
  return (
    <div className="sweet-loading">
      <BeatLoader
        css={override}
        size={10}
        color="#1da1f2"
        loading={loading}
      />
    </div>
  );
};

export default Loader;
