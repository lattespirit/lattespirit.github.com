import React from "react";
import Head from "../components/Head";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Search from "../components/Search";

export default ({ children }) => (
  <div>
    <Head />
    <img
      className="fixed bg-cover min-w-full min-h-full -z-1"
      alt="background"
      src={"/images/background.jpg"}
    />

    <Header />

    <div className="mb-20">{children}</div>

    <Search />

    <Footer />
  </div>
);
