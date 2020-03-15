import React from "react";
import Typography from "../components/Typography";

export default () => (
  <Typography>
    <div className="flex justify-center items-center w-full h-40 md:h-80 lg:h-100 my-4 bg-white rounded-lg shadow-xl">
      <img src="/typography/logo-black.svg" alt="logo-black" />
    </div>

    <div className="flex justify-end my-2">
      <a
        className="px-2 py-1 text-xs font-bold bg-white hover:bg-purple-dark text-black hover:text-white border border-gray rounded-full no-underline"
        href="/typography/logo-black.svg"
      >
        logo-black.svg
      </a>
    </div>

    <div className="flex justify-center items-center w-full h-40 md:h-80 lg:h-100 my-4 bg-black rounded-lg shadow-xl">
      <img src="/typography/logo-white.svg" alt="logo-white" />
    </div>

    <div className="flex justify-end mt-2 mb-4 md:mb-8">
      <a
        className="px-2 py-1 text-xs font-bold bg-white hover:bg-purple-dark text-black hover:text-white border border-gray rounded-full no-underline"
        href="/typography/logo-white.svg"
      >
        logo-white.svg
      </a>
    </div>
  </Typography>
);
