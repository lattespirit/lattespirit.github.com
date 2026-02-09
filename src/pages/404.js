import React from 'react';
import { Link } from 'gatsby';
import Head from '../components/Head';

const FoF = () => (
  <>
    <Head title="404" />
    <div className="flex flex-col justify-center items-center box mt-16 x:mt-28 sm:mt-36">
      <p className="text-white font-semibold text-6xl md:text-9xl tracking-widest">
        404
      </p>
      <p className="text-center text-white md:text-2xl">
        Looks like I've lost you somewhere.
      </p>
      <Link
        className="inline-block mt-8 md:mt-12 py-1 px-6 md:py-2 md:px-12 bg-pink-dark lg:bg-purple-dark rounded-full text-white text-xs lg:text-base uppercase no-underline"
        to="/"
      >
        Go Home
      </Link>
    </div>
  </>
);

export default FoF;
