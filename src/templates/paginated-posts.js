import { graphql, Link } from "gatsby";
import React, { Component } from "react";
import Layout from "../components/Layout";

export default class PaginatedPosts extends Component {
  render() {
    const posts = this.props.data.allMarkdownRemark.edges;
    const {
      currentPage,
      hasNextPage,
      hasPreviousPage,
      pageCount
    } = this.props.data.allMarkdownRemark.pageInfo;

    const previousUri =
      hasPreviousPage && currentPage !== 2 ? "/page/" + (currentPage - 1) : "/";
    const nextUri = hasNextPage
      ? "/page/" + (currentPage + 1)
      : "/page/" + currentPage;

    return (
      <Layout>
        {/* Paginated Posts */}
        {posts.map(({ node }) => {
          return (
            <div
              className="md:flex w-72 x:w-84 sm:w-100 md:w-120 mx-auto mt-8 rounded-lg bg-gray-lighter opacity-85 overflow-hidden"
              key={node.fields.slug}
            >
              {node.frontmatter.thumbnail && (
                <div
                  className="flex-none min-w-1/4 h-40 md:h-auto bg-cover"
                  style={{
                    backgroundImage: `url("${node.frontmatter.thumbnail}")`
                  }}
                ></div>
              )}
              <div className="w-full p-4 md:p-6">
                <div>
                  <Link
                    className="no-underline font-semibold text-black text-xl"
                    to={node.fields.slug}
                  >
                    {node.frontmatter.title}
                  </Link>
                  <p className="mt-2 text-gray-darkest text-sm x:text-base md:text-sm">
                    {node.frontmatter.description}
                  </p>
                </div>
                <div className="flex justify-between items-center mt-6">
                  <span className="text-gray-darkest text-sm">
                    {node.fields.date}
                  </span>
                  <Link
                    className="inline-block bg-purple-light rounded text-gray-lighter text-xs x:text-sm px-2 py-1 text-center no-underline"
                    to={node.fields.slug}
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
                  to={i === 0 ? "/" : "page/" + (i + 1)}
                  className="flex inline-block w-6 h-6 mr-2 text-sm x:text-base justify-center items-center bg-purple-light text-white rounded-full no-underline"
                >
                  {i + 1}
                </Link>
              ) : (
                <Link
                  key={i}
                  to={i === 0 ? "/" : "page/" + (i + 1)}
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
    allMarkdownRemark(
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
            thumbnail
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