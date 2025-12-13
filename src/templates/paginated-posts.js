import { graphql, Link, navigate } from "gatsby";
import React from "react";
import NewTag from "../components/NewTag";
import Layout from "../components/Layout";
import { motion } from "motion/react";
import ArrowRight from "../components/icons/ArrowRight";
import ArrowLeft from "../components/icons/ArrowLeft";

const MotionArrowRight = motion(ArrowRight);
const MotionArrowLeft = motion(ArrowLeft);
const MotionLink = motion(Link);

const PaginatedPosts = ({ data }) => {
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
            <div className="md:shrink-0 md:w-30">
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
                alt={node.frontmatter.title}
              />
            </div>
          )}
          <div className="w-full p-4 py-6 md:p-6">
            <div>
              <div className="flex justify-between items-center">
                <h5>
                  <Link
                    className="no-underline font-semibold text-purple-dark text-xl hover:text-purple-light"
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
              <motion.button
                className="flex items-center gap-1 rounded-sm text-gray-lighter text-xs x:text-sm px-2 py-1 text-center no-underline bg-purple-dark cursor-pointer"
                whileHover="hover"
                whileTap={{ scale: 0.95 }}
                initial="rest"
                animate="rest"
                variants={{
                  hover: { background: "var(--color-purple-light)", scale: 1.02},
                }}
                onClick={() => navigate(`/${node.fields.slug}`)}
              >
                <motion.span
                  className="text-gray-light"
                  variants={{
                    hover: { color: "var(--color-gray-lightest)" },
                  }}
                >
                  Read More
                </motion.span>
                <MotionArrowRight
                  className="text-gray-lightest"
                  variants={{
                    rest: { x: 0 },
                    hover: { x: 6 },
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                  }}
                />
              </motion.button>
            </div>
          </div>
        </div>
      ))}
      <div className="flex justify-center w-72 x:w-84 sm:w-100 h-8 mt-12 mx-auto">
        {/* Previous Button */}
        <MotionLink
          className="inline-flex justify-center items-center w-8 h-8 rounded-full bg-gray-lighter opacity-85 text-black no-underline"
          to={previousUri}
          aria-label="Previous"
          whileHover="hover"
          initial="rest"
          animate="rest"
        >
          <MotionArrowLeft
            className="w-4 h-4 text-black"
            variants={{
              rest: { x: 0 },
              hover: { x: -3 },
            }}
            transition={{ type: "spring", stiffness: 300 }}
          />
        </MotionLink>
        <div className="flex justify-center items-center mx-4 px-2 py-1 rounded-lg bg-gray-lighter opacity-85">
          {Array.from({ length: pageCount }).map((_, i) => (
            <MotionLink
              to={i === 0 ? "/" : `/page/${i + 1}`}
              className={`inline-flex w-8 h-8 mx-1 text-sm font-medium justify-center items-center no-underline rounded-md ${
                currentPage === i + 1
                  ? "bg-purple-light text-white shadow-sm"
                  : "text-gray-darkest"
              }`}
              key={i}
              whileHover={{
                backgroundColor: "var(--color-purple-light)",
                color: "white",
                scale: 1.1,
              }}
              transition={{ duration: 0.2 }}
            >
              {i + 1}
            </MotionLink>
          ))}
        </div>
        {/* Next Button */}
        <MotionLink
          className="inline-flex justify-center items-center w-8 h-8 rounded-full bg-gray-lighter opacity-85 text-black no-underline"
          aria-label="Next"
          to={nextUri}
          whileHover="hover"
          initial="rest"
          animate="rest"
        >
          <MotionArrowRight
            className="w-4 h-4 text-black"
            variants={{
              rest: { x: 0 },
              hover: { x: 3 },
            }}
            transition={{ type: "spring", stiffness: 300 }}
          />
        </MotionLink>
      </div>
    </Layout>
  );
};

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
