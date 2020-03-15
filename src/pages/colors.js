import React from "react";
import Typography from "../components/Typography";

export default () => {
  const blackAndWhite = [
    { name: "White", code: "FFFFFF", class: "white" },
    { name: "Black", code: "000000", class: "black" }
  ];
  const colorfuls = [
    {
      colors: [
        { name: "Purple Dark", code: "21067A", class: "purple-dark" },
        { name: "Purple Light", code: "4F239F", class: "purple-light" },
        { name: "Pink Dark", code: "F14B90", class: "pink-dark" },
        { name: "Pink Light", code: "ED6B99", class: "pink-light" }
      ]
    },

    {
      colors: [
        { name: "Gray Lightest", code: "F7FAFC", class: "gray-lightest" },
        { name: "Gray Lighter", code: "EDF2F7", class: "gray-lighter" },
        {
          name: "85 Opacity",
          code: "EDF2F7",
          class: "gray-lighter opacity-85"
        },
        { name: "Gray Light", code: "E2E8F0", class: "gray-light" }
      ]
    },

    {
      colors: [
        { name: "Gray", code: "CBD5E0", class: "gray" },
        { name: "Gray Dark", code: "A0AEC0", class: "gray-dark" },
        { name: "Gray Darker", code: "718096", class: "gray-darker" },
        { name: "Gray Darkest", code: "4A5568", class: "gray-darkest" }
      ]
    }
  ];
  return (
    <Typography>
      <div className="flex justify-between flex-wrap w-64 mx-auto md:mx-0 mt-6">
        {blackAndWhite.map(color => {
          return (
            <div className="flex flex-col items-center mt-4" key={color.name}>
              <div
                className={`w-24 h-24 rounded-full shadow-lg bg-${color.class}`}
              ></div>
              <span className="text-black mt-3 mb-1 font-bold">
                #{color.code}
              </span>
              <span className="text-black">{color.name}</span>
            </div>
          );
        })}
      </div>
      {colorfuls.map((colorful, index) => {
        return (
          <div
            className="flex justify-between flex-wrap w-64 md:w-144 mx-auto md:mx-0 mt-6 last:mb-8"
            key={index}
          >
            {colorful.colors.map(color => {
              return (
                <div className="flex flex-col items-center mt-4">
                  <div
                    className={`w-24 h-24 rounded-full shadow-lg bg-${color.class}`}
                  ></div>
                  <span className="mt-3 mb-1 text-black font-bold">
                    #{color.code}
                  </span>
                  <span className="text-black">{color.name}</span>
                </div>
              );
            })}
          </div>
        );
      })}
    </Typography>
  );
};
