import React from "react";
import { useStaticQuery, Link, graphql } from "gatsby";

export default () => {
  const data = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
          }
        }
      }
    `
  );
  return (
    <header className="flex justify-between items-center box py-6">
      <Link
        to="/"
        className="text-white inline-block text-xl x:text-2xl font-semibold cursor-default"
      >
        {data.site.siteMetadata.title}
      </Link>
      <div className="flex justify-center items-center md:hidden">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="text-white w-6 h-6 feather feather-menu"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="3" y1="12" x2="21" y2="12" />
          <line x1="3" y1="6" x2="21" y2="6" />
          <line x1="3" y1="18" x2="21" y2="18" />
        </svg>
      </div>

      <div className="hidden md:block self-end">
        <a className="text-white inline-block mr-6" href="/">
          Home
        </a>
        <a className="text-white inline-block mr-6" href="/archives">
          Archives
        </a>
        <a className="text-white inline-block mr-6" href="/testimonials">
          Testimonials
        </a>
        <a className="text-white inline-block mr-6" href="/about">
          About
        </a>
      </div>
    </header>
  );
};
