import { graphql, Link } from "gatsby"
import React, { Component } from 'react';
import Layout from "../components/layout";

export default class PaginatedPosts extends Component {
  render() {
    const posts = this.props.data.allMarkdownRemark.edges

    return (
      <Layout>
        {posts.map(({ node }) => {
          const title = node.frontmatter.title || node.fields.slug
          return <div key={node.fields.slug}>
            <Link to={node.fields.slug}>
              {title}
            </Link>
          </div>
        })}
      </Layout>
    )
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
    }
  }
`