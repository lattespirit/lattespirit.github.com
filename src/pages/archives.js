import React from "react";
import Head from "../components/Head";
import { Link, graphql } from "gatsby";
import Layout from "../components/Layout";

export default ({ data }) => {
  return (
    <Layout>
      <Head title="Archives" />
      <div className="flex flex-col box mt-4 p-6 md:p-10 bg-gray-lighter opacity-85 rounded-lg">
        {data.allMarkdownRemark.edges.map(({ node }, index) => {
          const firstYear =
            index === 0 ? new Date(node.fields.date).getFullYear() : "";
          const postYear = new Date(node.fields.date).getFullYear();
          const titleYear =
            index === 0
              ? firstYear
              : postYear !== titleYear
              ? postYear
              : firstYear;
          return (
            <React.Fragment>
              {titleYear === postYear && (
                <p className="text-lg md:text-xl font-bold first:mt-0 my-2">
                  {titleYear}
                </p>
              )}
              <div className="flex py-2" key={node.id}>
                <p className="mr-4">{node.fields.date}</p>
                <p>
                  <Link
                    className="text-purple-dark no-underline font-semibold"
                    to={node.fields.slug}
                  >
                    {node.frontmatter.title}
                  </Link>
                </p>
              </div>
            </React.Fragment>
          );
        })}
      </div>
    </Layout>
  );
};

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
