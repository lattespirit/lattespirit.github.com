import React from 'react';
import Layout from './src/components/Layout';
import ReducedMotion from './src/components/ReducedMotion';

export const wrapPageElement = ({ element, props }) => {
  return (
    <ReducedMotion>
      <Layout {...props}>{element}</Layout>
    </ReducedMotion>
  );
};

export const onRenderBody = ({ setHtmlAttributes }) => {
  setHtmlAttributes({ lang: 'zh' });
};
