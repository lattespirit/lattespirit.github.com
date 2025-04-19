/* eslint-disable react/prop-types */
import React from "react";
import { graphql, useStaticQuery } from "gatsby";
import { Helmet } from "react-helmet";
import Head from "./Head";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Search from "./Search";
import Toast from "./Toast";

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
      <Helmet>
        <html lang="zh" />
      </Helmet>
      <img
        className="fixed object-cover min-w-full min-h-full -z-1"
        alt="background"
        src={data.file.publicURL}
      />

      <Navbar />

      <div className="mb-20">{children}</div>

      <Search />

      <Toast />

      <Footer />
    </div>
  );
};
