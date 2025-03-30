/* eslint-disable react/prop-types */
import React from "react";

const NewTag = ({ className, children }) => (
  <span
    className={`bg-pink-dark animate-breath text-white rounded-md ${
      className || "px-2 py-1"
    }`}
  >
    {children || "NEW"}
  </span>
);

export default NewTag;
