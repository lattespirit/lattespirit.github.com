import React from "react";

const H1 = (props) => (
  <h1 className="font-bold text-5xl text-purple-dark" {...props} />
);
const H2 = (props) => (
  <h2 className="font-bold text-4xl text-purple-dark" {...props} />
);
const H3 = (props) => (
  <h3 className="font-bold text-3xl text-purple-dark" {...props} />
);
const H4 = (props) => (
  <h4 className="font-bold text-2xl text-purple-dark" {...props} />
);
const H5 = (props) => (
  <h5 className="font-bold text-xl text-purple-dark" {...props} />
);
const H6 = (props) => (
  <h6 className="font-bold text-base text-purple-dark" {...props} />
);

const P = (props) => <p className="leading-relaxed" {...props} />;

const UL = (props) => (
  <ul
    className="my-2 md:my-3 pl-6 list-outside list-disc marker:text-purple-dark"
    {...props}
  />
);

const LI = (props) => <li className="mb-1 md:mb-2" {...props} />;

const Strong = (props) => <strong className="text-pink-dark" {...props} />;

const Img = (props) => <img className="mx-auto" {...props} />;

const UI = {
  h1: H1,
  h2: H2,
  h3: H3,
  h4: H4,
  h5: H5,
  h6: H6,
  p: P,
  ul: UL,
  li: LI,
  strong: Strong,
  img: Img,
};

export default UI;
