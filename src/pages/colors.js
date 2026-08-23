import React from 'react';
import SiteHead from '../components/Head';
import Typography from '../components/Typography';

const Colors = () => {
  const blackAndWhite = [
    { name: 'White', code: 'FFFFFF', class: 'bg-white' },
    { name: 'Black', code: '000000', class: 'bg-black' },
  ];
  const colorfuls = [
    {
      colors: [
        { name: 'Purple Dark', code: '21067A', class: 'bg-purple-dark' },
        { name: 'Purple Light', code: '4F239F', class: 'bg-purple-light' },
        { name: 'Pink Dark', code: 'F14B90', class: 'bg-pink-dark' },
        { name: 'Pink Light', code: 'ED6B99', class: 'bg-pink-light' },
      ],
    },

    {
      colors: [
        { name: 'Gray Lightest', code: 'FAF6F3', class: 'bg-gray-lightest' },
        { name: 'Gray Lighter', code: 'F4EDE9', class: 'bg-gray-lighter' },
        {
          name: '85 Opacity',
          code: 'F4EDE9',
          class: 'bg-gray-lighter opacity-85',
        },
        { name: 'Gray Light', code: 'E7DDD7', class: 'bg-gray-light' },
      ],
    },

    {
      colors: [
        { name: 'Gray', code: 'D3C5BD', class: 'bg-gray' },
        { name: 'Gray Dark', code: 'B29D95', class: 'bg-gray-dark' },
        { name: 'Gray Darker', code: '75605A', class: 'bg-gray-darker' },
        { name: 'Gray Darkest', code: '5B4743', class: 'bg-gray-darkest' },
      ],
    },
  ];
  return (
    <Typography>
      <div className="flex justify-between flex-wrap w-64 mx-auto md:mx-0 mt-6">
        {blackAndWhite.map((color) => (
          <div className="flex flex-col items-center mt-4" key={color.name}>
            <div
              className={`w-24 h-24 rounded-2xl shadow-lg shadow-purple-dark/30 ring-1 ring-white/15 ${color.class}`}
            />
            <span className="text-white mt-3 mb-1 font-bold tabular-nums">
              #
              {color.code}
            </span>
            <span className="text-white/70">{color.name}</span>
          </div>
        ))}
      </div>
      {colorfuls.map((colorful, index) => (
        <div
          className="flex justify-between flex-wrap w-64 md:w-144 mx-auto md:mx-0 mt-6 last:mb-8"
          key={index}
        >
          {colorful.colors.map((color) => (
            <div
              className="flex flex-col items-center mt-4"
              key={color.name}
            >
              <div
                className={`w-24 h-24 rounded-2xl shadow-lg shadow-purple-dark/30 ring-1 ring-white/15 ${color.class}`}
              />
              <span className="mt-3 mb-1 text-white font-bold tabular-nums">
                #
                {color.code}
              </span>
              <span className="text-white/70">{color.name}</span>
            </div>
          ))}
        </div>
      ))}
    </Typography>
  );
};

export const Head = () => <SiteHead title="Colors" />;

export default Colors;
