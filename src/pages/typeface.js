import React from 'react';
import SiteHead from '../components/Head';
import Typography from '../components/Typography';

const Typeface = () => (
  <Typography>
    <p className="flex items-center w-60 mx-auto sm:w-90 my-6 md:my-8 py-2 border-l-4 border-purple-light bg-gray-lighter text-purple-light md:text-xl text-center">
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-4 h-4 sm:w-6 sm:h-6 mx-2 sm:mx-4 feather feather-info"
      >
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="16" x2="12" y2="12" />
        <line x1="12" y1="8" x2="12.01" y2="8" />
      </svg>
      <span>
        Proudly using
        {' '}
        <a
          className="text-purple-light font-semibold"
          href="https://fonts.google.com/specimen/Nunito"
          target="_blank"
          rel="noopener noreferrer"
        >
          Nunito
        </a>
        {' '}
        font
      </span>
    </p>

    <div className="flex justify-center items-center w-full my-4 md:my-8 bg-white rounded-lg shadow-xl">
      <p className="text-xl md:text-2xl p-4 lg:text-3xl">
        A B C D E F G H I J K L M N O P Q R S T U V W X Y Z a b c d e f g h i
        j k l m n o p q r s t u v w x y z 1 2 3 4 5 6 7 8 9 0 ~ ! @ # $ % ^ &
        * ( ) &lt; &gt; _ +
        {' '}
        {}
        {' '}
        | : " ? [ ] \ ; ' , . /
      </p>
    </div>

    <div className="flex justify-center items-center w-full my-4 md:my-8 bg-black rounded-lg shadow-xl">
      <p className="text-xl md:text-2xl p-4 lg:text-3xl text-white">
        A B C D E F G H I J K L M N O P Q R S T U V W X Y Z a b c d e f g h i
        j k l m n o p q r s t u v w x y z 1 2 3 4 5 6 7 8 9 0 ~ ! @ # $ % ^ &
        * ( ) &lt; &gt; _ +
        {' '}
        {}
        {' '}
        | : " ? [ ] \ ; ' , . /
      </p>
    </div>
  </Typography>
);

export const Head = () => <SiteHead title="Typeface" />;

export default Typeface;
