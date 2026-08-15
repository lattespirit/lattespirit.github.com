import { Link } from "gatsby";
import React, { useState } from "react";
import { Bars3Icon, MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { AnimatePresence, motion } from "motion/react";
import { useLocation } from "@reach/router";
import useSiteMetadata from "../hooks/useSiteMetadata";
import { EASE_OUT, EASE_DRAWER } from "../lib/motion.js";

const MotionLink = motion.create(Link);

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { title } = useSiteMetadata();
  const { pathname } = useLocation();

  const toggleMenu = () => setOpen(!open);
  const closeMenu = () => setOpen(false);
  const openSearch = () => {
    window.dispatchEvent(new CustomEvent("open-search"));
  };

  const links = [
    { title: "Home", url: "/", showInLargeScreen: true },
    { title: "Archives", url: "/archives", showInLargeScreen: true },
    { title: "Uses", url: "/uses", showInLargeScreen: true },
    { title: "Testimonials", url: "/testimonials", showInLargeScreen: true },
    // { title: "Typography", url: "/logos", showInLargeScreen: false },
    { title: "About", url: "/about", showInLargeScreen: true },
  ];

  const isActive = (url) =>
    url === "/" ? pathname === "/" : pathname.startsWith(url);

  const animationProfiles = {
    balanced: {
      open: {
        duration: 0.3,
        ease: EASE_DRAWER,
      },
      closed: {
        duration: 0.25,
        ease: EASE_DRAWER,
      },
    },
  };

  const animationProfile = "balanced";
  const { open: openTransition, closed: closedTransition } =
    animationProfiles[animationProfile];

  const curveProfiles = {
    soft: {
      open: "M100 0 L100 100 Q-40 50 100 0",
      closed: "M100 0 L100 100 Q240 50 100 0",
    },
  };

  const curveProfile = "soft";
  const { open: openCurvePath, closed: closedCurvePath } =
    curveProfiles[curveProfile];

  return (
    <header className="flex justify-between items-center box py-6 min-h-20">
      <Link
        to="/"
        className="text-white inline-block text-xl x:text-2xl font-semibold no-underline"
      >
        {title}
      </Link>
      <div className="hidden md:flex gap-6">
        {links.map(
          (menu) =>
            menu.showInLargeScreen && (
              <Link
                className={`inline-block no-underline transition-colors duration-200 ${
                  isActive(menu.url)
                    ? "text-sunset-light"
                    : "text-white hover:text-sunset-light"
                }`}
                to={menu.url}
                key={menu.title}
              >
                {menu.title}
              </Link>
            )
        )}
      </div>

      <div className="flex items-center gap-3 md:hidden">
        <button
          className="flex justify-center items-center"
          onClick={openSearch}
          role="link"
          tabIndex={0}
          aria-label="Open search"
        >
          <MagnifyingGlassIcon className="text-white w-6 h-6" />
        </button>

        <button
          className="flex justify-center items-center"
          onClick={toggleMenu}
          role="link"
          tabIndex={0}
          aria-label="Toggle menu"
        >
          <Bars3Icon className="text-white w-6 h-6" />
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/50 z-20 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { duration: 0.2, ease: EASE_OUT } }}
              exit={{ opacity: 0, transition: { duration: 0.15, ease: EASE_OUT } }}
              onClick={closeMenu}
            />
            <motion.div
              className="fixed top-0 right-0 h-full w-full md:w-112.5 bg-purple-dark z-30"
              style={{
                willChange: 'transform',
                transform: 'translate3d(0, 0, 0)',
                backfaceVisibility: 'hidden',
                WebkitBackfaceVisibility: 'hidden',
              }}
              variants={{
                open: {
                  x: "0%",
                  transition: openTransition,
                },
                closed: {
                  x: "100%",
                  transition: closedTransition,
                },
              }}
              initial="closed"
              animate="open"
              exit="closed"
            >
              <svg 
                className="absolute top-0 -left-24.75 w-25 h-full fill-purple-dark stroke-none" 
                preserveAspectRatio="none" 
                viewBox="0 0 100 100"
                shapeRendering="geometricPrecision"
                style={{
                  transform: 'translate3d(0, 0, 0)',
                  backfaceVisibility: 'hidden',
                  WebkitBackfaceVisibility: 'hidden',
                }}
              >
                <motion.path 
                  variants={{
                    open: { 
                      d: openCurvePath,
                      transition: openTransition,
                    },
                    closed: { 
                      d: closedCurvePath,
                      transition: closedTransition,
                    }
                  }}
                  initial="closed"
                  animate="open"
                  exit="closed"
                />
              </svg>
              
              <div className="flex flex-col h-full box">
                <header className="flex justify-end items-center min-h-20 py-6">
                  <button
                    className="flex justify-center items-center"
                    onClick={closeMenu}
                    role="link"
                    aria-label="Close menu"
                    tabIndex={0}
                  >
                    <XMarkIcon className="w-6 h-6 text-white" />
                  </button>
                </header>
                <div className="flex flex-col justify-center items-center gap-8 mt-20">
                  {links.map((menu, index) => (
                    <MotionLink
                      className={`block text-xl no-underline ${
                        isActive(menu.url) ? "text-sunset-light" : "text-white"
                      }`}
                      to={menu.url}
                      key={menu.title}
                      onClick={closeMenu}
                      whileTap={{ scale: 0.95 }}
                      custom={index}
                      variants={{
                        open: (i) => ({
                          x: 0,
                          opacity: 1,
                          transition: {
                            duration: 0.3,
                            ease: EASE_OUT,
                            delay: Math.min(0.05 * i, 0.15),
                          },
                        }),
                        closed: () => ({
                          x: 80,
                          opacity: 0,
                          transition: {
                            duration: 0.15,
                            ease: EASE_OUT,
                          },
                        }),
                      }}
                    >
                      {menu.title}
                    </MotionLink>
                  ))}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
