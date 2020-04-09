/* eslint-disable react/prop-types */
import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import Head from './Head';
import Header from './Header';
import Footer from './Footer';
import Search from './Search';

export default ({ children }) => {
  const data = useStaticQuery(graphql`
    query BackgroundImageQuery {
      file(relativePath: { eq: "background.jpg" }) {
        publicURL
      }
    }
  `);
  return (
    <div>
      <Head />
      <img
        className="fixed object-cover min-w-full min-h-full -z-1"
        alt="background"
        src={data.file.publicURL}
      />

      <Header />

      <div className="mb-20">{children}</div>

      <Search />

      <Footer />
    </div>
  );
};
