import { graphql, Link } from "gatsby";
import React, { Component } from "react";
import Layout from "../components/layout";

export default class PaginatedPosts extends Component {
  render() {
    const posts = this.props.data.allMarkdownRemark.edges;
    const {
      currentPage,
      hasNextPage,
      hasPreviousPage,
      pageCount
    } = this.props.data.allMarkdownRemark.pageInfo;

    const previousStyle = hasPreviousPage ? "pointer" : "not-allow";
    const nextStyle = hasNextPage ? "pointer" : "not-allow";
    const previousUri =
      hasPreviousPage && currentPage != 2 ? "/page/" + (currentPage - 1) : "/";
    const nextUri = hasNextPage
      ? "/page/" + (currentPage + 1)
      : "/page/" + currentPage;

    return (
      <Layout>
        {posts.map(({ node }) => {
          const title = node.frontmatter.title || node.fields.slug;
          return (
            <div key={node.fields.slug}>
              <Link to={node.fields.slug}>{title}</Link>
            </div>
          );
        })}
        <ul
          style={{
            display: `flex`,
            justifyContent: `center`,
            listStyleType: `none`
          }}
        >
          <li style={{ cursor: previousStyle }}>
            <Link to={previousUri}>&#8592;</Link>
          </li>
          {Array.from({ length: pageCount }).map((_, i) => {
            return currentPage === i + 1 ? (
              <li
                key={i}
                style={{
                  textDecoration: `none`,
                  marginLeft: `10px`,
                  marginRight: `10px`
                }}
              >
                <Link to={i === 0 ? "/" : "page/" + (i + 1)}>{i + 1}</Link>
              </li>
            ) : (
              <li
                key={i}
                style={{
                  textDecoration: `none`,
                  marginLeft: `10px`,
                  marginRight: `10px`
                }}
              >
                <Link to={i === 0 ? "/" : "page/" + (i + 1)}>{i + 1}</Link>
              </li>
            );
          })}
          <li style={{ cursor: nextStyle }}>
            <Link to={nextUri}>&#8594;</Link>
          </li>
        </ul>
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
          }
          frontmatter {
            title
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
