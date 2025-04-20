import React from "react";
import { graphql, useStaticQuery } from "gatsby";
import { Helmet } from "react-helmet";
import Head from "./Head";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Search from "./Search";
import Toast from "./Toast";
import { AnimatePresence, motion } from "motion/react";

const duration = 0.3;
const ease = [0.76, 0, 0.24, 1];

const variants = {
  initial: {
    opacity: 0,
    scale: 1.01,
    transition: {
      ease,
      duration,
    },
  },
  animate: {
    opacity: 1,
    scale: 1,
    transition: {
      duration,
      delay: 0.1,
      when: "beforeChildren",
    },
  },
  exit: {
    opacity: 0,
    scale: 0.99,
    transition: {
      duration,
      ease,
    },
  },
};

const Layout = ({ children }) => {
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

      <AnimatePresence>
        <motion.main
          variants={variants}
          initial="initial"
          animate="animate"
          exit="exit"
          className="mb-20"
        >
          {children}
        </motion.main>
      </AnimatePresence>

      <Search />

      <Toast />

      <Footer />
    </div>
  );
};

export default Layout;
