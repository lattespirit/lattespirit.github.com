import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Search from "./Search";
import Toast from "./Toast";
import { motion } from "motion/react";
import { EASE_OUT, EASE_IN_OUT } from "../lib/motion.js";
import { useLocation } from "@reach/router";
import { StaticImage } from "gatsby-plugin-image";

const variants = {
  initial: {
    y: -20,
  },
  animate: {
    y: 0,
    transition: {
      duration: 0.3,
      ease: EASE_OUT,
    },
  },
};

const Layout = ({ children }) => {
  const location = useLocation();

  return (
    <div className="flex flex-col min-h-screen relative">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:px-4 focus:py-2 focus:rounded-md focus:bg-pink-dark focus:text-white focus:no-underline"
      >
        Skip to main content
      </a>

      <motion.div 
        className="fixed top-0 left-0 w-full h-[100lvh] -z-10"
        initial={{ scale: 1.08 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.56, ease: EASE_IN_OUT }}
      >
        <StaticImage
          src="../images/background.jpg"
          alt="Background"
          placeholder="dominantColor"
          layout="fullWidth"
          loading="eager"
          quality={90}
          className="w-full h-full object-cover"
        />
      </motion.div>

      <div className="ambient-glow" aria-hidden="true" />
      <div className="grain" aria-hidden="true" />

      <Navbar />

      <motion.main
        key={location.pathname}
        variants={variants}
        initial="initial"
        animate="animate"
        id="main-content"
        className="mb-20 will-change-transform"
      >
        {children}
      </motion.main>

      <Search />

      <Toast />

      <Footer />
    </div>
  )};
  
export default Layout;
