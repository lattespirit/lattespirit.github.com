/* eslint-disable react/prop-types */
import { graphql, Link } from 'gatsby';
import React, { Component } from 'react';
import Img from 'gatsby-image';
import NewTag from '../components/NewTag';
import Layout from '../components/Layout';

class PaginatedPosts extends Component {
  render() {
    const { data } = this.props;
    const { edges: posts, pageInfo } = data.allMdx;
    const { currentPage, hasNextPage, hasPreviousPage, pageCount } = pageInfo;

    const previousUri =
      hasPreviousPage && currentPage !== 2 ? `/page/${currentPage - 1}` : '/';
    const nextUri = hasNextPage
      ? `/page/${currentPage + 1}`
      : `/page/${currentPage}`;

    return (
      <Layout>
        {/* Paginated Posts */}
        {posts.map(({ node }) => {
          return (
            <div
              className="md:flex w-72 x:w-84 sm:w-100 md:w-120 mx-auto mt-8 rounded-lg bg-gray-lighter opacity-85 overflow-hidden"
              key={node.fields.slug}
            >
              {node.frontmatter.featuredImage && (
                <Img
                  className="flex-none min-w-1/4 h-40 md:h-auto"
                  fluid={node.frontmatter.featuredImage.childImageSharp.fluid}
                />
              )}
              <div className="w-full p-4 py-6 md:p-6">
                <div>
                  <div className="flex justify-between items-center">
                    <h5>
                      <Link
                        className="no-underline font-semibold text-black text-xl"
                        to={`/${node.fields.slug}`}
                      >
                        {node.frontmatter.title}
                      </Link>
                    </h5>
                    {Date.now() - new Date(node.fields.date) <
                      24 * 3600 * 15 * 1000 && (
                      <NewTag className="px-2 py-1 text-xs" />
                    )}
                  </div>
                  <p className="mt-2 text-gray-darkest text-sm x:text-base md:text-sm">
                    {node.frontmatter.description}
                  </p>
                </div>
                <div className="flex justify-between items-center mt-6">
                  <span className="text-purple-light font-bold text-sm">
                    {node.fields.date}
                  </span>
                  <Link
                    className="inline-block bg-purple-light rounded text-gray-lighter text-xs x:text-sm px-2 py-1 text-center no-underline"
                    to={`/${node.fields.slug}`}
                  >
                    Read More
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
        <div className="flex justify-center w-72 x:w-84 sm:w-100 h-8 mt-12 mx-auto">
          {/* Previous Button */}
          <Link
            className="inline-block flex justify-center items-center w-8 h-8 rounded-full bg-gray-lighter opacity-85"
            to={previousUri}
            aria-label="Previous"
          >
            <svg
              width="6"
              height="10"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5 1L1 5l4 4"
                stroke="#000"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
          <div className="flex justify-center items-center mx-4 px-4 rounded-full bg-gray-lighter opacity-85">
            {Array.from({ length: pageCount }).map((_, i) => {
              return currentPage === i + 1 ? (
                <Link
                  key={i}
                  to={i === 0 ? '/' : `/page/${i + 1}`}
                  className="flex inline-block w-6 h-6 mr-2 text-sm x:text-base justify-center items-center bg-purple-light text-white rounded-full no-underline"
                >
                  {i + 1}
                </Link>
              ) : (
                <Link
                  key={i}
                  to={i === 0 ? '/' : `/page/${i + 1}`}
                  className="flex inline-block w-6 h-6 mr-2 text-sm x:text-base justify-center items-center text-black no-underline"
                >
                  {i + 1}
                </Link>
              );
            })}
          </div>
          {/* Next Button */}
          <Link
            className="inline-block flex justify-center items-center w-8 h-8 rounded-full bg-gray-lighter opacity-85 text-black no-underline"
            aria-label="Next"
            to={nextUri}
          >
            <svg
              width="6"
              height="10"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1 9l4-4-4-4"
                stroke="#000"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
        </div>
      </Layout>
    );
  }
}

export const PaginatedPostsQuery = graphql`
  query paginatedPostsQuery($skip: Int!, $limit: Int!) {
    allMdx(
      sort: { fields: fields___date, order: DESC }
      limit: $limit
      skip: $skip
    ) {
      edges {
        node {
          fields {
            slug
            date
          }
          frontmatter {
            title
            description
            featuredImage {
              childImageSharp {
                fluid(maxWidth: 2000) {
                  ...GatsbyImageSharpFluid_withWebp_noBase64
                }
              }
            }
          }
        }
      }
      pageInfo {
        currentPage
        hasNextPage
        hasPreviousPage
        pageCount
      }
    }
  }
`;

export default PaginatedPosts;
