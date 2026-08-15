import React from 'react';
import { Link } from 'gatsby';
import SiteHead from '../components/Head';

const FoF = () => (
  <>
    <div className="flex flex-col justify-center items-center box mt-16 x:mt-28 sm:mt-36">
      <p className="text-white font-bold text-6xl md:text-9xl tracking-tight">
        404
      </p>
      <p className="text-center text-white/80 md:text-xl mt-2">
        Looks like I&apos;ve lost you somewhere.
      </p>
      <div className="flex items-center gap-4 mt-8">
        <Link
          className="inline-block py-2 px-6 bg-pink-dark hover:bg-purple-light rounded-lg text-white text-sm no-underline transition-colors duration-200"
          to="/"
        >
          Go Home
        </Link>
        <button
          type="button"
          className="inline-block py-2 px-6 bg-white/10 hover:bg-white/20 rounded-lg text-white text-sm cursor-pointer transition-colors duration-200"
          onClick={() => window.dispatchEvent(new CustomEvent("open-search"))}
        >
          Search
        </button>
      </div>
    </div>
  </>
);

export const Head = () => <SiteHead title="404" />;

export default FoF;
