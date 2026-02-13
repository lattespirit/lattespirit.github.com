import { graphql, Link, navigate } from "gatsby";
import React from "react";
import PropTypes from "prop-types";
import NewTag from "../components/NewTag";
import { motion } from "motion/react";
import ArrowRight from "../components/icons/ArrowRight";
import ArrowLeft from "../components/icons/ArrowLeft";

const MotionArrowRight = motion(ArrowRight);
const MotionArrowLeft = motion(ArrowLeft);
const MotionLink = motion(Link);

const PaginatedPosts = ({ data }) => {
  const { edges: posts, pageInfo } = data.allMdx;
  const { currentPage, hasNextPage, hasPreviousPage, pageCount } = pageInfo;

  const previousUri = currentPage - 1 === 1 ? "/" : `/page/${currentPage - 1}`;
  const nextUri = `/page/${currentPage + 1}`;

  const getPaginationItems = () => {
    if (pageCount <= 7) {
      return Array.from({ length: pageCount }, (_, index) => index + 1);
    }

    const items = [1];
    let left = Math.max(2, currentPage - 1);
    let right = Math.min(pageCount - 1, currentPage + 1);

    if (currentPage <= 3) {
      right = 4;
    }

    if (currentPage >= pageCount - 2) {
      left = pageCount - 3;
    }

    if (left > 2) {
      items.push("left-ellipsis");
    }

    for (let page = left; page <= right; page += 1) {
      items.push(page);
    }

    if (right < pageCount - 1) {
      items.push("right-ellipsis");
    }

    items.push(pageCount);
    return items;
  };

  const paginationItems = getPaginationItems();

  return (
    <>
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
      <div className="flex justify-center items-center w-full max-w-xs sm:max-w-md md:max-w-xl h-10 mt-12 mx-auto px-2">
        {/* Previous Button */}
        {hasPreviousPage ? (
          <MotionLink
            className="inline-flex justify-center items-center w-9 h-9 rounded-full bg-gray-lighter opacity-85 text-black no-underline shrink-0"
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
        ) : (
          <span
            className="inline-flex justify-center items-center w-9 h-9 rounded-full bg-gray-lighter opacity-45 text-black shrink-0"
            aria-hidden="true"
          >
            <ArrowLeft className="w-4 h-4" />
          </span>
        )}

        <div className="flex justify-center items-center h-10 mx-2 sm:mx-4 px-2 sm:px-4 rounded-lg bg-gray-lighter opacity-85 gap-1 sm:gap-2 min-w-0">
          {paginationItems.map((item) => {
            if (typeof item !== "number") {
              return (
                <span
                  className="inline-flex w-8 h-8 font-medium justify-center items-center text-gray-darkest"
                  key={item}
                  aria-hidden="true"
                >
                  …
                </span>
              );
            }

            return (
              <MotionLink
                to={item === 1 ? "/" : `/page/${item}`}
                className={`inline-flex w-7 h-7 sm:w-8 sm:h-8 text-sm sm:text-base font-medium justify-center items-center no-underline rounded-full shrink-0 ${
                  currentPage === item
                    ? "bg-purple-light text-white shadow-sm"
                    : "text-gray-darkest"
                }`}
                key={item}
                whileHover={{
                  backgroundColor: "var(--color-purple-light)",
                  color: "white",
                  scale: 1.08,
                }}
                transition={{ duration: 0.2 }}
                aria-current={currentPage === item ? "page" : undefined}
              >
                {item}
              </MotionLink>
            );
          })}
        </div>

        {/* Next Button */}
        {hasNextPage ? (
          <MotionLink
            className="inline-flex justify-center items-center w-9 h-9 rounded-full bg-gray-lighter opacity-85 text-black no-underline shrink-0"
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
        ) : (
          <span
            className="inline-flex justify-center items-center w-9 h-9 rounded-full bg-gray-lighter opacity-45 text-black shrink-0"
            aria-hidden="true"
          >
            <ArrowRight className="w-4 h-4" />
          </span>
        )}
      </div>
    </>
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

PaginatedPosts.propTypes = {
  data: PropTypes.shape({
    allMdx: PropTypes.shape({
      edges: PropTypes.arrayOf(PropTypes.object).isRequired,
      pageInfo: PropTypes.shape({
        currentPage: PropTypes.number.isRequired,
        hasNextPage: PropTypes.bool.isRequired,
        hasPreviousPage: PropTypes.bool.isRequired,
        pageCount: PropTypes.number.isRequired,
      }).isRequired,
    }).isRequired,
  }).isRequired,
};

export default PaginatedPosts;
