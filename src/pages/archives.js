import React from "react";
import Layout from "../components/layout";
import { Link, graphql } from "gatsby";

export default ({ data }) => (
  <Layout>
    <div className="flex flex-col box mt-4 p-6 md:p-10 bg-gray-lighter opacity-85 rounded-lg">
      {data.allMarkdownRemark.edges.map(({ node }) => {
        return (
          <div className="flex py-2" key={node.id}>
            <p className="mr-4">{node.fields.date}</p>
            <p>
              <Link className="text-purple-dark" to={node.fields.slug}>
                {node.frontmatter.title}
              </Link>
            </p>
          </div>
        );
      })}
    </div>
  </Layout>
);

export const query = graphql`
  query {
    allMarkdownRemark(sort: { fields: fields___date, order: DESC }) {
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
`;
