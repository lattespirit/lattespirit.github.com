import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { GatsbyImage } from "gatsby-plugin-image";
import { useStaticQuery, graphql, Link } from "gatsby";

export default function Toast({ message = "👀 嘿，新的博文补给已经到达。" }) {
  const [show, setShow] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  const data = useStaticQuery(graphql`
    query {
      allMdx(sort: { fields: { date: DESC } }, limit: 1) {
        edges {
          node {
            fields {
              slug
            }
            frontmatter {
              title
              description
            }
          }
        }
      }
      me: file(relativePath: { eq: "lattespirit.jpg" }) {
        childImageSharp {
          gatsbyImageData(placeholder: NONE, layout: FULL_WIDTH)
        }
      }
    }
  `);

  const latestPost = data.allMdx.edges[0]?.node;
  const latestPostSlug = latestPost?.fields?.slug;
  const latestPostDescription = latestPost?.frontmatter?.description;
  const latestPostTitle = latestPost?.frontmatter?.title;

  useEffect(() => {
    const cachedSlug = localStorage.getItem("latestPostSlug");
    if (cachedSlug && cachedSlug !== latestPostSlug) {
      setShow(true);
    }
    localStorage.setItem("latestPostSlug", latestPostSlug);
  }, [latestPostSlug]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          layout
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.9 }}
          transition={{ type: "spring", stiffness: 500, damping: 20 }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="fixed top-6 right-0 md:right-6 ml-4 md:ml-0 pl-4 pr-12 py-2 bg-white/20 backdrop-blur-md rounded-xl flex items-center space-x-3 shadow-lg border border-white/20 text-sm md:text-base overflow-hidden origin-top cursor-pointer"
        >
          <motion.div layout className="shrink-0">
            <GatsbyImage
              image={data.me.childImageSharp.gatsbyImageData}
              className="w-8 h-8 rounded-full"
              alt="Jeffrey Yeung"
            />
          </motion.div>
          <motion.div layout className="flex flex-col w-56 md:w-64 relative">
            <AnimatePresence mode="popLayout" initial={false}>
              {!isHovered ? (
                <motion.span
                  key="message"
                  layout
                  initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -20, filter: "blur(4px)" }}
                  transition={{ duration: 0.3 }}
                  className="text-pink-light block"
                >
                  {message}
                </motion.span>
              ) : (
                <motion.div
                  key="content"
                  layout
                  initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -20, filter: "blur(4px)" }}
                  transition={{ duration: 0.3 }}
                >
                  <Link
                    to={latestPostSlug}
                    className="flex flex-col transition duration-300 no-underline gap-1"
                  >
                    <span className="text-pink-light">{latestPostTitle}</span>
                    {latestPostDescription && (
                      <span className="text-sm text-white/40">
                        {latestPostDescription}
                      </span>
                    )}
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
          <motion.button
            className="absolute top-3 right-3 text-white bg-white/20 hover:bg-white/40 rounded-full p-1 cursor-pointer transition-colors"
            aria-label="Close"
            onClick={() => setShow(false)}
          >
            <X size={16} />
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
