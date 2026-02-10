import { Link } from "gatsby";
import React, { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import useSiteMetadata from "../hooks/useSiteMetadata";

const MotionLink = motion(Link);

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { title } = useSiteMetadata();

  const toggleMenu = () => setOpen(!open);
  const closeMenu = () => setOpen(false);

  const links = [
    { title: "Home", url: "/", showInLargeScreen: true },
    { title: "Archives", url: "/archives", showInLargeScreen: true },
    { title: "Uses", url: "/uses", showInLargeScreen: true },
    { title: "Testimonials", url: "/testimonials", showInLargeScreen: true },
    // { title: "Typography", url: "/logos", showInLargeScreen: false },
    { title: "About", url: "/about", showInLargeScreen: true },
  ];

  return (
    <header className="flex justify-between items-center box py-6 min-h-20">
      <Link
        to="/"
        className="text-white inline-block text-xl x:text-2xl font-semibold cursor-default no-underline"
      >
        {title}
      </Link>
      <div className="hidden md:flex gap-6">
        {links.map(
          (menu) =>
            menu.showInLargeScreen && (
              <Link
                className="text-white inline-block no-underline hover:text-gray-dark"
                to={menu.url}
                key={menu.title}
              >
                {menu.title}
              </Link>
            )
        )}
      </div>

      {/* Mobile Menu Hamburger */}
      <button
        className="flex justify-center items-center md:hidden"
        onClick={toggleMenu}
        role="link"
        tabIndex={0}
        aria-label="Toggle menu"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="text-white w-6 h-6 feather feather-menu"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="3" y1="12" x2="21" y2="12" />
          <line x1="3" y1="6" x2="21" y2="6" />
          <line x1="3" y1="18" x2="21" y2="18" />
        </svg>
      </button>

      <AnimatePresence mode="wait">
        {open && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/50 z-20 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeMenu}
            />
            <motion.div
              className="fixed top-0 right-0 h-full w-full md:w-[450px] bg-purple-dark/95 z-30"
              variants={{
                open: {
                  x: "0%",
                  transition: {
                    duration: 0.55,
                    ease: [0.76, 0, 0.24, 1],
                  },
                },
                closed: {
                  x: "100%",
                  transition: {
                    duration: 0.55,
                    ease: [0.76, 0, 0.24, 1],
                  },
                },
              }}
              initial="closed"
              animate="open"
              exit="closed"
            >
              <svg 
                className="absolute top-0 -left-[99px] w-[100px] h-full fill-purple-dark/95 stroke-none" 
                preserveAspectRatio="none" 
                viewBox="0 0 100 100"
              >
                <motion.path 
                  variants={{
                    open: { 
                      d: "M100 0 L100 100 C -75 100 -75 0 100 0",
                      transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1] }
                    },
                    closed: { 
                      d: "M100 0 L100 100 C 100 100 100 0 100 0",
                      transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1] }
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
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="w-6 h-6 text-white feather feather-x"
                    >
                      <line x1="18" y1="6" x2="6" y2="18" />
                      <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                  </button>
                </header>
                <div className="flex flex-col justify-center items-center gap-8 mt-20">
                  {links.map((menu, index) => (
                    <MotionLink
                      className="block text-xl font-light text-white no-underline"
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
                            duration: 0.5,
                            ease: [0.76, 0, 0.24, 1],
                            delay: 0.05 * i,
                          },
                        }),
                        closed: (i) => ({
                          x: 80,
                          opacity: 0,
                          transition: {
                            duration: 0.5,
                            ease: [0.76, 0, 0.24, 1],
                            delay: 0.05 * i,
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
