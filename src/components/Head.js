import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import PropTypes from 'prop-types';

const Head = ({ title, description }) => {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
          description
          url
        }
      }
    }
  `);
  const { title: siteTitle, description: siteDescription, url } = data.site.siteMetadata;
  const pageTitle = title ? `${title} - ${siteTitle}` : siteTitle;
  const metaDescription = description || siteDescription;

  return (
    <>
      <title>{pageTitle}</title>
      <meta name="description" content={metaDescription} />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:site_name" content={siteTitle} />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={metaDescription} />
      <link rel="canonical" href={url} />
    </>
  );
};

Head.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
};

export default Head;
