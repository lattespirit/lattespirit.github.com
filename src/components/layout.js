/* eslint-disable react/prop-types */
import React from 'react';
import Head from './Head';
import Header from './Header';
import Footer from './Footer';
import Search from './Search';

export default ({ children }) => (
  <div>
    <Head />
    <img
      className="fixed object-cover min-w-full min-h-full -z-1"
      alt="background"
      src="/images/background.jpg"
    />

    <Header />

    <div className="mb-20">{children}</div>

    <Search />

    <Footer />
  </div>
);
