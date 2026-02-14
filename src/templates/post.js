/* eslint-disable react/prop-types */
import React from "react";
import { graphql, Link } from "gatsby";
import { MDXProvider } from "@mdx-js/react";
import SiteHead from "../components/Head";
import Disqus from "../components/Disqus";
import UI from "../components/UI";
import Carousel from "../components/Carousel";
import Car from "../components/Car";
import ArrowLeft from "../components/icons/ArrowLeft";
import ArrowRight from "../components/icons/ArrowRight";
import { motion } from "motion/react";

const MotionArrowLeft = motion.create(ArrowLeft);
const MotionArrowRight = motion.create(ArrowRight);
const MotionLink = motion.create(Link);

const Post = ({ data, pageContext, children }) => {
  const post = data.mdx;
  const { prev, next } = pageContext;
  const prevText = prev ? "上篇" : "未始";
  const nextText = next ? "下篇" : "未央";
  const prevUri = prev ? prev.fields.slug : post.fields.slug;
  const nextUri = next ? next.fields.slug : post.fields.slug;
  const prevClass = `flex items-center w-24 h-8 text-sm mr-18 lg:mr-32 bg-gray-lighter hover:bg-purple-light text-purple-dark hover:text-white opacity-85 rounded-full no-underline transition-colors duration-300 cursor-${
    prev ? "pointer" : "not-allowed"
  }`;
  const nextClass = `flex justify-end items-center w-24 h-8 text-sm bg-gray-lighter hover:bg-purple-light text-purple-dark hover:text-white opacity-85 rounded-full no-underline transition-colors duration-300 cursor-${
    next ? "pointer" : "not-allowed"
  }`;
  return (
    <>
      <div
        className="flex flex-col items-center box mt-4 px-4 md:px-8 lg:px-12 py-2 md:py-4 rounded-lg"
        style={{ backgroundColor: "rgba(237, 242, 247, 0.85)" }}
      >
        <p className="text-lg x:text-xl md:text-2xl font-bold mt-4">
          {post.frontmatter.title}
        </p>
        <p className="text-sm x:text-base text-gray-darkest my-2">
          {post.fields.date}
        </p>
        <div className="text-sm md:text-base paragraph">
          <MDXProvider components={{ ...UI, Carousel, Car }}>
            {children}
          </MDXProvider>
        </div>
      </div>

      <div className="flex justify-between x:justify-center h-6 box mt-8">
        <MotionLink
          className={prevClass}
          to={`/${prevUri}`}
          whileHover="hover"
          initial="rest"
          animate="rest"
        >
          <MotionArrowLeft
            className="w-4 h-4 stroke-current inline-block mx-3"
            variants={{
              rest: { x: 0 },
              hover: { x: -3 },
            }}
            transition={{ type: "spring", stiffness: 300 }}
          />
          <p>{prevText}</p>
        </MotionLink>
        <MotionLink
          className={nextClass}
          to={`/${nextUri}`}
          whileHover="hover"
          initial="rest"
          animate="rest"
        >
          <p>{nextText}</p>
          <MotionArrowRight
            className="w-4 h-4 stroke-current inline-block mx-3"
            variants={{
              rest: { x: 0 },
              hover: { x: 3 },
            }}
            transition={{ type: "spring", stiffness: 300 }}
          />
        </MotionLink>
      </div>
      <Disqus
        disqus={{ slug: post.fields.slug, title: post.frontmatter.title }}
      />
    </>
  );
};

export const PostQuery = graphql`
  query PostQuery($slug: String!) {
    mdx(fields: { slug: { eq: $slug } }) {
      body
      frontmatter {
        title
      }
      fields {
        slug
        date
      }
    }
  }
`;

export const Head = ({ data }) => (
  <SiteHead title={data?.mdx?.frontmatter?.title} />
);

export default Post;
