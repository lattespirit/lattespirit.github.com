/* eslint-disable react/prop-types */
import React from 'react';
import * as newTagStyles from './newtag.module.css';

const NewTag = ({ className, children }) => (
  <span
    className={`${newTagStyles.newtag} text-white rounded-md ${
      className || 'px-2 py-1'
    }`}
  >
    {children || 'NEW'}
  </span>
);

export default NewTag;
