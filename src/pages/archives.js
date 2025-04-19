import React from 'react';
import { Link, graphql } from 'gatsby';
import Head from '../components/Head';
import Layout from '../components/Layout';

const groupPostsByYear = (posts) => {
  return posts.reduce((acc, { node }) => {
    const year = new Date(node.fields.date).getFullYear();
    if (!acc[year]) acc[year] = [];
    acc[year].push(node);
    return acc;
  }, {});
};

const Archives = ({ data }) => {
  const postsByYear = groupPostsByYear(data.allMdx.edges);

  return (
    <Layout>
      <Head title="Archives" />
      <div className="flex flex-col box mt-4 p-6 md:p-10 bg-gray-lighter opacity-85 rounded-lg">
        {Object.keys(postsByYear)
          .sort((a, b) => b - a)
          .map((year) => (
            <div key={year}>
              <h2 className="text-lg md:text-xl font-bold first:mt-0 my-2">
                {year}
              </h2>
              {postsByYear[year].map((post) => (
                <div className="flex items-center gap-0.5 py-2" key={post.id}>
                  <time
                    className="w-24 text-sm text-gray-darkest"
                    dateTime={post.fields.date}
                  >
                    {post.fields.date}
                  </time>
                    <Link
                      className="flex-1 text-purple-dark no-underline font-semibold"
                      to={`/${post.fields.slug}`}
                    >
                      {post.frontmatter.title}
                    </Link>
                </div>
              ))}
            </div>
          ))}
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
            date(formatString: "YYYY-MM-DD") # Format the date directly
          }
        }
      }
    }
  }
`;

export default Archives;
