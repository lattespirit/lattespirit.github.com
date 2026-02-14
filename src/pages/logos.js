import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import SiteHead from '../components/Head';
import Typography from '../components/Typography';

const Logos = () => {
  const data = useStaticQuery(graphql`
    query TypographyQuery {
      black: file(relativePath: { eq: "typography/logo-black.svg" }) {
        publicURL
      }
      white: file(relativePath: { eq: "typography/logo-white.svg" }) {
        publicURL
      }
    }
  `);
  const { black, white } = data;
  return (
    <Typography>
      <div className="flex justify-center items-center w-full h-40 md:h-80 lg:h-100 my-4 bg-white rounded-lg shadow-xl">
        <img src={black.publicURL} alt="logo-black" />
      </div>

      <div className="flex justify-end my-2">
        <a
          className="px-2 py-1 text-xs font-bold bg-white hover:bg-purple-dark text-black hover:text-white border border-gray rounded-full no-underline"
          href={black.publicURL}
        >
          logo-black.svg
        </a>
      </div>

      <div className="flex justify-center items-center w-full h-40 md:h-80 lg:h-100 my-4 bg-black rounded-lg shadow-xl">
        <img src={white.publicURL} alt="logo-white" />
      </div>

      <div className="flex justify-end mt-2 mb-4 md:mb-8">
        <a
          className="px-2 py-1 text-xs font-bold bg-white hover:bg-purple-dark text-black hover:text-white border border-gray rounded-full no-underline"
          href={white.publicURL}
        >
          logo-white.svg
        </a>
      </div>
    </Typography>
  );
};

export const Head = () => <SiteHead title="Logos" />;

export default Logos;
