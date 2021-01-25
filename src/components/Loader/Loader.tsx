import React from 'react';
import { css } from '@emotion/core';
import BeatLoader from 'react-spinners/BeatLoader';

const override = css`
  display: block;
  margin: 0 auto;
  border-color: black;
`;

const Loader = () => (
  <div className="sweet-loading">
    building your model
    <BeatLoader
      css={override}
      size={10}
      color="#1da1f2"
    />
  </div>
);

export default Loader;
