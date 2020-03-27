/* eslint-disable react/prop-types */
import React from 'react';
import newTagStyles from './newtag.module.css';

export default ({ className, children }) => {
  return (
    <span
      className={`${newTagStyles.newtag} text-white rounded-md ${
        className || 'px-2 py-1'
      }`}
    >
      {children || 'NEW'}
    </span>
  );
};
