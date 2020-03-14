import React from "react";

export default () => (
  <footer className="mx-auto text-white text-xs x:text-base mt-auto">
    <p className="text-center">
      Image from{" "}
      <a
        className="no-underline"
        href="https://dribbble.com/febinraj"
        target="_blank"
        rel="noopener noreferrer"
      >
        Febin_Raj
      </a>
    </p>
    <div className="mt-3 md:flex md:justify-center md:items-center">
      <p className="text-center">
        Powered by{" "}
        <a
          className="no-underline"
          href="https://jekyllrb.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          Jekyll
        </a>{" "}
        @{" "}
        <a
          className="no-underline"
          href="https://github.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          Github
        </a>
      </p>
      <p className="text-center my-3">
        {" "}
        © 2012 - 2020 | Design with{" "}
        <span role="img" aria-label="love">
          ❤️
        </span>{" "}
        by{" "}
        <a className="no-underline" href="https://lattespirit.com">
          Lattespirit
        </a>
      </p>
    </div>
  </footer>
);
