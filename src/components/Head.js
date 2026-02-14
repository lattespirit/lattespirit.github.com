import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import PropTypes from 'prop-types';

const Head = ({ title }) => {
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
  return <title>{caculatedTitle}</title>;
};

Head.propTypes = {
  title: PropTypes.string
};

export default Head;
