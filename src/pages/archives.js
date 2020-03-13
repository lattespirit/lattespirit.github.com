import React from "react";
import Layout from "../components/layout"
import { Link, graphql } from "gatsby"

export default ({ data }) => (
  <Layout>
    <h1>Archives Page</h1>
    <h4>{data.allMarkdownRemark.totalCount} Posts</h4>
    {data.allMarkdownRemark.edges.map(({ node }) => (
      <div key={node.id}>
        <div style={{ display: `flex`, justifyContent: `start`, alignItems: `center` }}>
          <span style={{ marginRight: `1rem` }}>
            {node.fields.date}
          </span>
          <Link to={node.fields.slug}>
            <h2>
              {node.frontmatter.title}
            </h2>
          </Link>
        </div>
      </div>
    ))}
  </Layout >
);

export const query = graphql`
  query {
    allMarkdownRemark(sort: {fields: fields___date, order: DESC}) {
      totalCount
      edges {
        node {
          id
          frontmatter {
            title
          }
          fields {
            slug
            date
          }
        }
      }
    }
  }
`