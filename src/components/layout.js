import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default ({ children }) => (
  <div>
    <img
      className="fixed bg-cover min-w-full min-h-full -z-1"
      alt="background"
      src={"/background.jpg"}
    />

    <Header />

    <div className="mb-20">{children}</div>

    <Footer />
  </div>
);
