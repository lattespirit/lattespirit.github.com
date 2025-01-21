/* eslint-disable react/prop-types */
import React from 'react';
import { Link, graphql } from 'gatsby';
import Head from '../components/Head';
import Layout from '../components/Layout';

const Archives = ({ data }) => {
  let titleYear = '';
  return (
    <Layout>
      <Head title="Archives" />
      <div className="flex flex-col box mt-4 p-6 md:p-10 bg-gray-lighter opacity-85 rounded-lg">
        {data.allMdx.edges.map(({ node }) => {
          const postYear = new Date(node.fields.date).getFullYear();

          const Title = (
            <React.Fragment key={node.id}>
              {titleYear !== postYear && (
                <p className="text-lg md:text-xl font-bold first:mt-0 my-2">
                  {postYear}
                </p>
              )}
              <div className="flex py-2" key={node.id}>
                <p className="mr-4">{node.fields.date}</p>
                <p>
                  <Link
                    className="text-purple-dark no-underline font-semibold"
                    to={`/${node.fields.slug}`}
                  >
                    {node.frontmatter.title}
                  </Link>
                </p>
              </div>
            </React.Fragment>
          );
          if (titleYear !== postYear) {
            titleYear = postYear;
          }

          return Title;
        })}
      </div>
    </Layout>
  );
};

export const query = graphql`
  query {
    allMdx(sort: { fields: { date: DESC } }) {
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

export default Archives;
