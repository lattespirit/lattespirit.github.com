require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
});

module.exports = {
  siteMetadata: {
    url: process.env.SITE_URL,
    title: 'Lattespirit',
    description: "Jeffrey Yeung's Blog",
  },
  plugins: [
    'gatsby-transformer-remark',
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    'gatsby-plugin-react-helmet',
    'gatsby-transformer-json',
    {
      resolve: 'gatsby-plugin-mdx',
      options: {
        extensions: ['.md', '.mdx'],
        gatsbyRemarkPlugins: [
          {
            resolve: 'gatsby-remark-images',
            options: {
              maxWidth: 1200,
              linkImagesToOriginal: false,
            },
          },
        ],
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'pages',
        path: `${__dirname}/src/pages`,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'posts',
        path: `${__dirname}/src/posts`,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'json',
        path: `${__dirname}/src/content`,
      },
    },
    'gatsby-plugin-postcss',
    {
      resolve: 'gatsby-plugin-purgecss',
      options: {
        printRejected: true,
        develop: false,
        tailwind: true,
        ignore: [
          'node_modules/slick-carousel/slick/slick-theme.css',
          'node_modules/slick-carousel/slick/slick.css',
        ],
      },
    },
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'Lattespirit',
        short_name: 'Lattespirit',
        start_url: '/',
        background_color: '#F14B90',
        theme_color: '#21067A',
        display: 'standalone',
        icon: 'src/images/lattespirit-rounded.png',
      },
    },
    {
      resolve: 'gatsby-plugin-google-analytics',
      options: {
        trackingId: 'UA-40706666-1',
      },
    },
    {
      resolve: 'gatsby-plugin-offline',
      options: {
        precachePages: ['/', '/archives', '/testimonials', '/uses', '/about'],
      },
    },
    {
      resolve: 'gatsby-plugin-feed',
      options: {
        query: `
          {
            site {
              siteMetadata {
                url
                title
                description
              }
            }
          }
        `,
        feeds: [
          {
            serialize: ({ query: { site, allMarkdownRemark } }) => allMarkdownRemark.edges.map(
              (edge) => ({
                ...edge.node.frontmatter,
                description: edge.node.excerpt,
                date: edge.node.fields.date,
                url: `${site.siteMetadata.url}/${edge.node.fields.slug}`,
                guid: `${site.siteMetadata.url}/${edge.node.fields.slug}`,
              }),
            ),
            query: `
              {
                allMarkdownRemark(sort: {
                    fields: fields___date,
                    order: DESC
                  }, filter: {
                    rawMarkdownBody: {
                      regex: "/^((?!Carousel).)*$/s"
                    }
                  }) {
                  edges {
                    node {
                      frontmatter {
                        description
                        title
                      }
                      fields {
                        date
                        slug
                      }
                      excerpt(format: HTML, pruneLength: 1000000)
                    }
                  }
                }
              }
            `,
            setup: (options) => ({
              ...options,
              site_url: process.env.SITE_URL,
              feed_url: `${process.env.SITE_URL}/rss.xml`,
            }),
            output: '/rss.xml',
            title: "Lattespirit's Blog",
          },
        ],
      },
    },
  ],
};
