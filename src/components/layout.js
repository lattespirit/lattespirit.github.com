import React from "react";
import Header from "../components/header";
import Footer from "../components/footer";
import Background from "../images/background.jpg";

export default ({ children }) => (
  <div>
    <img
      className="fixed bg-cover min-w-full min-h-full -z-1"
      src={Background}
    />

    <Header />

    <div className="mb-20">{children}</div>

    <Footer />
  </div>
);
