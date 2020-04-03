import React from 'react';

const H6 = (props) => (
  <h6 className="font-bold text-xl text-purple-dark" {...props} />
);
const H5 = (props) => (
  <h5 className="font-bold text-2xl text-purple-dark" {...props} />
);
const H4 = (props) => (
  <h4 className="font-bold text-3xl text-purple-dark" {...props} />
);
const H3 = (props) => (
  <h3 className="font-bold text-4xl text-purple-dark" {...props} />
);
const H2 = (props) => (
  <h2 className="font-bold text-5xl text-purple-dark" {...props} />
);
const H1 = (props) => (
  <h1 className="font-bold text-6xl text-purple-dark" {...props} />
);

const Img = (props) => <img className="mx-auto rounded-lg" {...props} />;

const UI = {
  h6: H6,
  h5: H5,
  h4: H4,
  h3: H3,
  h2: H2,
  h1: H1,
  img: Img,
};

export default UI;
