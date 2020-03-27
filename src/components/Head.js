/* eslint-disable react/prop-types */
import React from 'react';
import { Helmet } from 'react-helmet';
import { useStaticQuery, graphql } from 'gatsby';

export default ({ title }) => {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
        }
      }
    }
  `);
  const caculatedTitle = title
    ? `${title} - ${data.site.siteMetadata.title}`
    : data.site.siteMetadata.title;
  return <Helmet title={caculatedTitle} />;
};
