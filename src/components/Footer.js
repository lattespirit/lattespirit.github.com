import React from "react";
import { useStaticQuery, graphql } from "gatsby";

export default () => {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
        }
      }
    }
  `);
  return (
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
            href="https://www.gatsbyjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Gatsby
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
          <span className="invisible md:visible text-white">&nbsp;|&nbsp;</span>
        </p>
        <p className="text-center my-3">
          © 2012 - 2020 | Design with{" "}
          <span role="img" aria-label="love">
            ❤️
          </span>{" "}
          by{" "}
          <a className="no-underline" href="https://lattespirit.com">
            {data.site.siteMetadata.title}
          </a>
        </p>
      </div>
    </footer>
  );
};
