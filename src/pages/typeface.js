import React from 'react';
import SiteHead from '../components/Head';
import Typography from '../components/Typography';
import { InformationCircleIcon } from '@heroicons/react/24/outline';

const characterSample =
  'A B C D E F G H I J K L M N O P Q R S T U V W X Y Z a b c d e f g h i j k l m n o p q r s t u v w x y z 1 2 3 4 5 6 7 8 9 0 ~ ! @ # $ % ^ & * ( ) < > _ + { } | : " ? [ ] \\ ; \' , . /';

const Typeface = () => (
  <Typography>
    <p className="flex items-center w-60 mx-auto sm:w-90 my-6 md:my-8 py-2 border-l-4 border-sunset-pink bg-gray-lighter/85 text-purple-dark md:text-xl text-center rounded-r-md">
      <InformationCircleIcon className="w-4 h-4 sm:w-6 sm:h-6 mx-2 sm:mx-4 shrink-0" />
      <span>
        Proudly using
        {' '}
        <a
          className="text-pink-dark font-semibold"
          href="https://fonts.google.com/specimen/Outfit"
          target="_blank"
          rel="noopener noreferrer"
        >
          Outfit
        </a>
        {' '}
        font
      </span>
    </p>

    <div className="flex justify-center items-center w-full my-4 md:my-8 bg-gray-lightest rounded-lg shadow-xl shadow-purple-dark/30">
      <p className="text-xl md:text-2xl p-4 lg:text-3xl text-gray-darkest">
        {characterSample}
      </p>
    </div>

    <div className="flex justify-center items-center w-full my-4 md:my-8 bg-silhouette-darkest rounded-lg shadow-xl shadow-purple-dark/40">
      <p className="text-xl md:text-2xl p-4 lg:text-3xl text-white">
        {characterSample}
      </p>
    </div>
  </Typography>
);

export const Head = () => <SiteHead title="Typeface" />;

export default Typeface;
