import React, { useEffect } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Search from "./Search";
import ToastProvider, { useToast } from "./Toast";
import { motion } from "motion/react";
import { EASE_OUT, EASE_IN_OUT } from "../lib/motion.js";
import { useLocation } from "@reach/router";
import { StaticImage } from "gatsby-plugin-image";
import { useStaticQuery, graphql, Link, navigate } from "gatsby";

const variants = {
  initial: {
    y: -20,
  },
  animate: {
    y: 0,
    transition: {
      duration: 0.3,
      ease: EASE_OUT,
    },
  },
};

const LayoutInner = ({ children }) => {
  const location = useLocation();
  const { toast, removeToast } = useToast();

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
    }
  `);

  const latestPost = data.allMdx.edges[0]?.node;
  const latestPostSlug = latestPost?.fields?.slug;
  const latestPostDescription = latestPost?.frontmatter?.description;
  const latestPostTitle = latestPost?.frontmatter?.title;
  const normalizedSlug = latestPostSlug?.startsWith("/")
    ? latestPostSlug
    : `/${latestPostSlug}`;

  useEffect(() => {
    const cachedSlug = localStorage.getItem("latestPostSlug");
    if (latestPostSlug) {
      if (!cachedSlug) {
        localStorage.setItem("latestPostSlug", latestPostSlug);
      } else if (cachedSlug !== latestPostSlug) {
        toast({
          id: "new-post",
          message: "👀 嘿，新的博文补给已经到达。",
          onClick: () => {
            localStorage.setItem("latestPostSlug", latestPostSlug);
            removeToast("new-post");
            navigate(normalizedSlug);
          },
          content: (
            <Link
              to={normalizedSlug}
              onClick={(e) => {
                e.stopPropagation();
                localStorage.setItem("latestPostSlug", latestPostSlug);
                removeToast("new-post");
              }}
              className="flex flex-col transition duration-300 no-underline gap-1"
            >
              <span className="text-pink-light">{latestPostTitle}</span>
              {latestPostDescription && (
                <span className="text-sm text-white/40">
                  {latestPostDescription}
                </span>
              )}
            </Link>
          ),
          onDismiss: () => {
            localStorage.setItem("latestPostSlug", latestPostSlug);
          },
        });
      }
    }
  }, [
    latestPostSlug,
    normalizedSlug,
    latestPostTitle,
    latestPostDescription,
    toast,
    removeToast,
  ]);

  return (
    <div className="flex flex-col min-h-screen relative">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:px-4 focus:py-2 focus:rounded-md focus:bg-pink-dark focus:text-white focus:no-underline"
      >
        Skip to main content
      </a>

      <motion.div
        className="fixed top-0 left-0 w-full h-[100lvh] -z-10"
        initial={{ scale: 1.08 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.56, ease: EASE_IN_OUT }}
      >
        <StaticImage
          src="../images/background.jpg"
          alt="Background"
          placeholder="dominantColor"
          layout="fullWidth"
          loading="eager"
          quality={90}
          className="w-full h-full object-cover"
        />
      </motion.div>

      <div className="ambient-glow" aria-hidden="true" />
      <div className="grain" aria-hidden="true" />

      <Navbar />

      <motion.main
        key={location.pathname}
        variants={variants}
        initial="initial"
        animate="animate"
        id="main-content"
        className="mb-20 will-change-transform"
      >
        {children}
      </motion.main>

      <Search />

      <Footer />
    </div>
  );
};

const Layout = ({ children }) => (
  <ToastProvider>
    <LayoutInner>{children}</LayoutInner>
  </ToastProvider>
);

export default Layout;
