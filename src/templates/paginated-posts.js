/* eslint-disable react/prop-types */
import { graphql, Link } from "gatsby";
import React, { Component } from "react";
import NewTag from "../components/NewTag";
import Layout from "../components/Layout";
import { ArrowRight } from "lucide-react";

class PaginatedPosts extends Component {
  render() {
    const { data } = this.props;
    const { edges: posts, pageInfo } = data.allMdx;
    const { currentPage, hasNextPage, hasPreviousPage, pageCount } = pageInfo;

    const previousUri =
      hasPreviousPage && currentPage !== 2 ? `/page/${currentPage - 1}` : "/";
    const nextUri = hasNextPage
      ? `/page/${currentPage + 1}`
      : `/page/${currentPage}`;

    return (
      <Layout>
        {/* Paginated Posts */}
        {posts.map(({ node }) => (
          <div
            className="md:flex w-72 x:w-84 sm:w-100 md:w-120 mx-auto mt-8 rounded-lg bg-gray-lighter opacity-85 overflow-hidden"
            key={node.fields.slug}
          >
            {node.frontmatter.featuredImage !== null && (
              <div className="md:flex-shrink-0 md:w-30">
                <img
                  className="w-full h-40 md:h-full object-cover object-center"
                  src={
                    node.frontmatter.featuredImage.childImageSharp
                      .gatsbyImageData.images.fallback.src
                  }
                  srcSet={
                    node.frontmatter.featuredImage.childImageSharp
                      .gatsbyImageData.images.sources.srcSet
                  }
                />
              </div>
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
                  {/* NewTag should show up when post is created in 15 days. */}
                  {Date.now() - new Date(node.fields.date) < 1296000000 && (
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
                  className="inline-block flex items-center gap-1 bg-purple-light rounded text-gray-lighter text-xs x:text-sm px-2 py-1 text-center no-underline"
                  to={`/${node.fields.slug}`}
                >
                  <span className="text-gray-lightest">Read More</span>
                  <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </div>
        ))}
        <div className="flex justify-center w-72 x:w-84 sm:w-100 h-8 mt-12 mx-auto">
          {/* Previous Button */}
          <Link
            className="inline-flex justify-center items-center w-8 h-8 rounded-full bg-gray-lighter opacity-85"
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
            {Array.from({ length: pageCount }).map((_, i) => (
              <Link
                to={i === 0 ? "/" : `/page/${i + 1}`}
                className={`inline-flex w-6 h-6 mr-2 text-sm x:text-base justify-center items-center no-underline rounded-full ${
                  currentPage === i + 1
                    ? "bg-purple-light text-white"
                    : "text-black"
                }`}
                key={i}
              >
                {i + 1}
              </Link>
            ))}
          </div>
          {/* Next Button */}
          <Link
            className="inline-flex justify-center items-center w-8 h-8 rounded-full bg-gray-lighter opacity-85 text-black no-underline"
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
    allMdx(sort: { fields: { date: DESC } }, limit: $limit, skip: $skip) {
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
                gatsbyImageData(placeholder: NONE, layout: FULL_WIDTH)
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
