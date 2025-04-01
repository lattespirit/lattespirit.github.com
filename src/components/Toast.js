import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { GatsbyImage } from "gatsby-plugin-image";
import { useStaticQuery, graphql } from "gatsby";

export default function Toast({ message = "👀 嘿，新的博文补给已经到达。" }) {
  const [show, setShow] = useState(false);

  const data = useStaticQuery(graphql`
    query {
      allMdx(sort: { fields: { date: DESC } }, limit: 1) {
        edges {
          node {
            fields {
              slug
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

  const latestPostSlug = data.allMdx.edges[0]?.node?.fields?.slug;

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
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.3 }}
          className="fixed top-6 right-0 md:right-6 mx-4 md:mx-0 px-4 py-2 bg-white/20 backdrop-blur-md rounded-xl flex items-center space-x-3 shadow-lg border border-white/20 text-sm md:text-base"
          onClick={() => setShow(false)}
        >
          <GatsbyImage
            image={data.me.childImageSharp.gatsbyImageData}
            className="w-8 h-8 rounded-full"
            alt="Jeffrey Yeung"
          />
          <span className="text-pink-light">{message}</span>
          <button
            className="text-white bg-white/20 hover:bg-white/40 rounded-full p-1 transition"
            aria-label="Close"
          >
            <X size={16} />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
