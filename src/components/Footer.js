import React from "react";
import { Link } from "gatsby";

export default () => (
  <footer className="mx-auto text-white text-xs x:text-base mt-auto">
    <p className="text-center">
      Image from{" "}
      <a
        href="https://dribbble.com/febinraj"
        target="_blank"
        className="text-pink-dark"
      >
        Febin_Raj
      </a>
    </p>
    <div className="mt-3 md:flex md:justify-center md:items-center">
      <p className="text-center">
        Powered by{" "}
        <a
          href="https://jekyllrb.com"
          target="_blank"
          className="text-pink-dark"
        >
          Jekyll
        </a>{" "}
        @{" "}
        <a href="https://github.com" target="_blank" className="text-pink-dark">
          Github
        </a>
        <span className="invisible md:visible">{}</span>
      </p>
      <p className="text-center my-3">
        © 2012 - 2020 | Design with ❤️ by
        <a href="https://lattespirit.com" className="text-pink-dark">
          <Link to="/">Lattespirit</Link>
        </a>
      </p>
    </div>
  </footer>
);
