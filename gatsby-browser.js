import React from 'react';
import Layout from './src/components/Layout';
import ReducedMotion from './src/components/ReducedMotion';
import './src/styles/lattespirit.css';

export const wrapPageElement = ({ element, props }) => {
  return (
    <ReducedMotion>
      <Layout {...props}>{element}</Layout>
    </ReducedMotion>
  );
};

// eslint-disable-next-line import/prefer-default-export
export const onServiceWorkerUpdateReady = () => window.location.reload(true);
