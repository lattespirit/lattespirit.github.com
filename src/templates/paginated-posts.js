import { graphql, Link, navigate } from "gatsby";
import React from "react";
import PropTypes from "prop-types";
import NewTag from "../components/NewTag";
import SiteHead from "../components/Head";
import { motion } from "motion/react";
import ArrowRight from "../components/icons/ArrowRight";
import ArrowLeft from "../components/icons/ArrowLeft";

const MotionArrowRight = motion.create(ArrowRight);
const MotionArrowLeft = motion.create(ArrowLeft);
const MotionLink = motion.create(Link);

export const Head = () => <SiteHead />;

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
      <h1 className="sr-only">Jeffrey Yeung&apos;s Blog</h1>
      {/* Paginated Posts */}
      {posts.map(({ node }, index) => {
        const hasImage = node.frontmatter.featuredImage !== null;
        return (
          <div
            className={`soft-panel relative w-72 x:w-84 sm:w-100 md:w-120 mx-auto mt-8 overflow-hidden rounded-2xl animate-card-enter ${
              hasImage ? "bg-silhouette-dark" : "bg-gray-lighter"
            }`}
            key={node.fields.slug}
            style={{ animationDelay: `${Math.min(index, 5) * 40}ms` }}
          >
            {hasImage && (
              <>
                <img
                  className="absolute inset-0 w-full h-full object-cover object-center"
                  src={
                    node.frontmatter.featuredImage.childImageSharp
                      .gatsbyImageData.images.fallback.src
                  }
                  srcSet={
                    node.frontmatter.featuredImage.childImageSharp
                      .gatsbyImageData.images.sources.srcSet
                  }
                  alt={node.frontmatter.title}
                  loading="lazy"
                />
                {/* Readability veil — darkest at the bottom (over the glass),
                    lighter toward the top so white copy reads on any image */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    backgroundImage:
                      "linear-gradient(to top, rgba(10,6,20,0.85) 0%, rgba(38,24,62,0.44) 36%, rgba(38,24,62,0.26) 66%, rgba(38,24,62,0.16) 100%)",
                  }}
                />
                {/* Frosted-glass blur that fades out toward the top */}
                <div
                  className="absolute inset-x-0 bottom-0 h-2/5 pointer-events-none backdrop-blur-[7px]"
                  style={{
                    WebkitMaskImage:
                      "linear-gradient(to top, rgba(0,0,0,1) 8%, rgba(0,0,0,0) 100%)",
                    maskImage:
                      "linear-gradient(to top, rgba(0,0,0,1) 8%, rgba(0,0,0,0) 100%)",
                  }}
                />
              </>
            )}
            {hasImage && (
              <div
                className="soft-recess absolute inset-0 rounded-[inherit] pointer-events-none"
                aria-hidden="true"
              />
            )}
            <div
              className={`relative flex flex-col gap-6 px-4 py-6 sm:px-5 md:px-6 ${
                hasImage ? "justify-end min-h-52" : "justify-between"
              }`}
            >
              <div>
                <div className="flex justify-between items-center gap-2">
                  <h5>
                    <Link
                      className={`no-underline font-semibold text-xl leading-snug tracking-tight transition-colors duration-200 ${
                        hasImage
                          ? "text-white hover:text-sunset-light [text-shadow:0_1px_2px_rgba(10,6,20,0.6),0_2px_18px_rgba(10,6,20,0.45)]"
                          : "text-purple-dark hover:text-pink-dark"
                      }`}
                      to={`/${node.fields.slug}`}
                    >
                      {node.frontmatter.title}
                    </Link>
                  </h5>
                  {/* NewTag should show up when post is created in 15 days. */}
                  {Date.now() - new Date(node.fields.date) < 1296000000 && (
                    <NewTag className="px-2 py-1 text-[10px]" />
                  )}
                </div>
                <p
                  className={`mt-2 text-sm leading-relaxed x:text-base md:text-sm ${
                    hasImage
                      ? "text-gray-light [text-shadow:0_1px_8px_rgba(10,6,20,0.55)]"
                      : "text-gray-darkest"
                  }`}
                >
                  {node.frontmatter.description}
                </p>
              </div>
              <div className="flex justify-between items-center">
                <span
                  className={`font-bold text-sm tabular-nums ${
                    hasImage ? "text-pink-light" : "text-purple-light"
                  }`}
                >
                  {node.fields.date}
                </span>
                <motion.button
                  className={`flex items-center gap-1.5 rounded-full text-xs x:text-sm px-3 py-1 text-center no-underline cursor-pointer ${
                    hasImage
                      ? "bg-white/15 text-white border border-white/25 backdrop-blur-sm shadow-[0_2px_6px_rgba(13,8,26,0.18)]"
                      : "bg-purple-dark text-gray-lighter shadow-[inset_0_1px_0_rgba(255,255,255,0.16),inset_0_-1px_2px_rgba(10,6,20,0.32),0_2px_5px_rgba(13,8,26,0.24)]"
                  }`}
                  whileHover="hover"
                  whileTap={{ scale: 0.95 }}
                  initial="rest"
                  animate="rest"
                  variants={{
                    hover: hasImage
                      ? {
                          backgroundColor: "rgba(255,255,255,0.28)",
                          borderColor: "rgba(255,255,255,0.5)",
                          scale: 1.02,
                        }
                      : { backgroundColor: "var(--color-purple-light)", scale: 1.02 },
                  }}
                  onClick={() => navigate(`/${node.fields.slug}`)}
                >
                  <motion.span
                    className={hasImage ? "text-white" : "text-gray-light"}
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
        );
      })}
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
