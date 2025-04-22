import React from "react";
import { graphql, useStaticQuery } from "gatsby";
import { Helmet } from "react-helmet";
import Head from "./Head";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Search from "./Search";
import Toast from "./Toast";
import { motion } from "motion/react";
import { useLocation } from "@reach/router";

const duration = 0.4;
const ease = [0.76, 0, 0.24, 1];

const variants = {
  initial: {
    opacity: 0.8,
    y: -20,
    transition: {
      duration,
      ease,
    },
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration,
      ease,
    },
  },
};

const Layout = ({ children }) => {
  const location = useLocation();

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

      <motion.main
        key={location.pathname}
        variants={variants}
        initial="initial"
        animate="animate"
        className="mb-20"
      >
        {children}
      </motion.main>

      <Search />

      <Toast />

      <Footer />
    </div>
  );
};

export default Layout;
