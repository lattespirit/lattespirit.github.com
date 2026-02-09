import React from "react";

const H1 = ({ children, ...props }) => (
  <h1 className="font-bold text-5xl text-twilight-deeper" {...props}>
    {children}
  </h1>
);
const H2 = ({ children, ...props }) => (
  <h2 className="font-bold text-4xl text-twilight-deeper" {...props}>
    {children}
  </h2>
);
const H3 = ({ children, ...props }) => (
  <h3 className="font-bold text-3xl text-twilight-deeper" {...props}>
    {children}
  </h3>
);
const H4 = ({ children, ...props }) => (
  <h4 className="font-bold text-2xl text-twilight-deeper" {...props}>
    {children}
  </h4>
);
const H5 = ({ children, ...props }) => (
  <h5 className="font-bold text-xl text-twilight-deeper" {...props}>
    {children}
  </h5>
);
const H6 = ({ children, ...props }) => (
  <h6 className="font-bold text-base text-twilight-deeper" {...props}>
    {children}
  </h6>
);

const P = (props) => (
  <p className="leading-relaxed text-silhouette-dark" {...props} />
);

const UL = (props) => (
  <ul
    className="my-2 md:my-3 pl-6 list-outside list-disc marker:text-twilight-deeper"
    {...props}
  />
);

const LI = (props) => (
  <li className="mb-1 md:mb-2 text-silhouette-dark" {...props} />
);

const Strong = (props) => (
  <strong className="text-twilight-deep" {...props} />
);

const Img = ({ alt = "", ...props }) => (
  <img className="mx-auto" alt={alt} {...props} />
);

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
