const path = require('path');
const { createFilePath } = require('gatsby-source-filesystem');

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions;

  if (node.internal.type === 'Mdx' || node.internal.type === 'MarkdownRemark') {
    const filename = createFilePath({ node, getNode, basePath: 'posts' });

    const [, date, title] = filename.match(
      /^\/([\d]{4}-[\d]{2}-[\d]{2})-{1}(.+)\/$/,
    );

    createNodeField({
      node,
      name: 'date',
      value: date,
    });

    createNodeField({
      node,
      name: 'slug',
      value: title,
    });
  }
};

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions;
  const result = await graphql(`
    query {
      allMdx(sort: { fields: { date: DESC } }) {
        edges {
          node {
            fields {
              slug
              date
            }
            frontmatter {
              title
            }
            internal {
              contentFilePath
            }
          }
        }
      }
    }
  `);

  if (result.errors) {
    reporter.panicOnBuild('Error while running GraphQL query.');
    return;
  }

  const postsPerPage = 20;
  const posts = result.data.allMdx.edges;
  const numPages = Math.ceil(posts.length / postsPerPage);

  posts.forEach(({ node }, index) => {
    const postTemplate = path.resolve('./src/templates/post.js');
    createPage({
      path: node.fields.slug,
      component: `${postTemplate}?__contentFilePath=${node.internal.contentFilePath}`,
      context: {
        slug: node.fields.slug,
        title: node.frontmatter.title,
        prev: index === posts.length - 1 ? null : posts[index + 1].node,
        next: index === 0 ? null : posts[index - 1].node,
      },
    });
  });

  Array.from({ length: numPages }).forEach((_, i) => {
    createPage({
      path: i === 0 ? '/' : `/page/${i + 1}`,
      component: path.resolve('./src/templates/paginated-posts.js'),
      context: {
        limit: postsPerPage,
        skip: i * postsPerPage,
        numPages,
        currentPage: i + 1,
      },
    });
  });
};
