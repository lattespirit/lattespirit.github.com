/* eslint-disable react/prop-types */
import React from 'react';
import { graphql, Link } from 'gatsby';
import { MDXProvider } from '@mdx-js/react';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import Head from '../components/Head';
import Layout from '../components/Layout';
import Disqus from '../components/Disqus';
import UI from '../components/UI';
import Carousel from '../components/Carousel';
import Car from '../components/Car';

export default ({ data, pageContext }) => {
  const post = data.mdx;
  const { prev, next } = pageContext;
  const prevText = prev ? '上篇' : '未始';
  const nextText = next ? '下篇' : '未央';
  const prevUri = prev ? prev.fields.slug : post.fields.slug;
  const nextUri = next ? next.fields.slug : post.fields.slug;
  const prevClass = `inline-block flex items-center w-24 h-8 text-sm mr-18 lg:mr-32 bg-gray-lighter hover:bg-purple-light text-purple-dark hover:text-white opacity-85 rounded-full no-underline cursor-${
    prev ? 'pointer' : 'not-allowed'
  }`;
  const nextClass = `inline-block flex justify-end items-center w-24 h-8 text-sm bg-gray-lighter hover:bg-purple-light text-purple-dark hover:text-white opacity-85 rounded-full no-underline cursor-${
    next ? 'pointer' : 'not-allowed'
  }`;
  return (
    <Layout>
      <Head title={post.frontmatter.title} />
      <div
        className="flex flex-col items-center box mt-4 px-4 md:px-8 py-2 md:py-4 rounded-lg"
        style={{ backgroundColor: 'rgba(237, 242, 247, 0.85)' }}
      >
        <p className="text-lg x:text-xl md:text-2xl font-bold mt-4">
          {post.frontmatter.title}
        </p>
        <p className="text-sm x:text-base text-gray-darkest my-2">
          {post.fields.date}
        </p>
        <div className="text-sm md:text-base paragraph">
          <MDXProvider components={{ ...UI, Carousel, Car }}>
            <MDXRenderer>{post.body}</MDXRenderer>
          </MDXProvider>
        </div>
      </div>

      <div className="flex justify-between x:justify-center h-6 box mt-8">
        <Link className={prevClass} to={`/${prevUri}`}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="feather feather-chevrons-left w-4 h-4 stroke-current inline-block mx-3"
          >
            <polyline points="11 17 6 12 11 7" />
            <polyline points="18 17 13 12 18 7" />
          </svg>
          <p>{prevText}</p>
        </Link>
        <Link className={nextClass} to={`/${nextUri}`}>
          <p>{nextText}</p>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="feather feather-chevrons-right w-4 h-4 stroke-current inline-block mx-3"
          >
            <polyline points="13 17 18 12 13 7" />
            <polyline points="6 17 11 12 6 7" />
          </svg>
        </Link>
      </div>
      <Disqus
        disqus={{ slug: post.fields.slug, title: post.frontmatter.title }}
      />
    </Layout>
  );
};

export const query = graphql`
  query($slug: String!) {
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
