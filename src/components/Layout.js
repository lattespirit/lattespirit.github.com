import React from "react";
import { Helmet } from "react-helmet";
import Head from "./Head";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Search from "./Search";
import Toast from "./Toast";
import { motion } from "motion/react";
import { useLocation } from "@reach/router";
import { StaticImage } from "gatsby-plugin-image";

const variants = {
  initial: {
    y: -20,
  },
  animate: {
    y: 0,
    transition: {
      duration: 0.4,
      type: "spring",
      bounce: 0,
      stiffness: 100,
      damp: 20,
      delay: 0.16,
    },
  },
};

const Layout = ({ children }) => {
  const location = useLocation();

  return (
    <div className="flex flex-col min-h-screen relative">
      
      <motion.div 
        className="fixed inset-0 -z-10"
        initial={{ scale: 1.08 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
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
      
      <Head />
      <Helmet>
        <html lang="zh" />
      </Helmet>

      <Navbar />

      <motion.main
        key={location.pathname}
        variants={variants}
        initial="initial"
        animate="animate"
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