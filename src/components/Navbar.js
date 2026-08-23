import { Link, navigate } from "gatsby";
import React, { useState } from "react";
import { Bars3Icon, MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { AnimatePresence, motion } from "motion/react";
import { useLocation } from "@reach/router";
import useSiteMetadata from "../hooks/useSiteMetadata";
import { EASE_OUT, EASE_SILK } from "../lib/motion.js";

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

  const openTypography = (e) => {
    e.preventDefault();
    navigate("/logos");
  };

  const isActive = (url) =>
    url === "/" ? pathname === "/" : pathname.startsWith(url);

  return (
    <header className="flex justify-between items-center box py-6 min-h-20">
      <Link
        to="/"
        className="text-white inline-block text-xl x:text-2xl font-semibold no-underline"
        onContextMenu={openTypography}
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
          className="flex justify-center items-center transition-transform duration-200 ease-out active:scale-90"
          onClick={openSearch}
          role="link"
          tabIndex={0}
          aria-label="Open search"
        >
          <MagnifyingGlassIcon className="text-white w-6 h-6" />
        </button>

        <button
          className="flex justify-center items-center transition-transform duration-200 ease-out active:scale-90"
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
              className="fixed inset-0 bg-black/45 z-20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { duration: 0.4, ease: EASE_OUT } }}
              exit={{ opacity: 0, transition: { duration: 0.3, ease: EASE_OUT } }}
              onClick={closeMenu}
            />
            <motion.div
              className="fixed top-0 right-0 h-full w-[80%] md:w-112.5 bg-purple-dark z-30"
              style={{
                willChange: "transform",
                transform: "translate3d(0, 0, 0)",
                backfaceVisibility: "hidden",
                WebkitBackfaceVisibility: "hidden",
              }}
              variants={{
                open: {
                  x: "0%",
                  transition: { duration: 0.8, ease: EASE_SILK },
                },
                closed: {
                  x: "calc(100% + 100px)",
                  transition: { duration: 0.8, ease: EASE_SILK },
                },
              }}
              initial="closed"
              animate="open"
              exit="closed"
            >
              <MenuCurve />
              
              <div className="flex flex-col h-full box">
                <header className="flex justify-end items-center min-h-20 py-6">
                  <button
                    className="flex justify-center items-center transition-transform duration-200 ease-out active:scale-90"
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
                            duration: 0.8,
                            ease: EASE_SILK,
                            delay: Math.min(0.06 * i, 0.3),
                          },
                        }),
                        closed: () => ({
                          x: 80,
                          opacity: 0,
                          transition: {
                            duration: 0.4,
                            ease: EASE_SILK,
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

// The curved left edge of the drawer. It hangs off the drawer's left edge
// (about 64px) and morphs between a deep "peel" curve (closed) and a straight
// edge (open) while the drawer slides in. Positioned using real pixel coords
// against the current viewport height, exactly like the reference demo. The
// component only ever mounts client-side (inside `open && ...`), so it is safe
// to read `window.innerHeight` here.
const MenuCurve = () => {
  const [height, setHeight] = useState(() =>
    typeof window !== "undefined" ? window.innerHeight : 0
  );

  React.useEffect(() => {
    const measure = () => setHeight(window.innerHeight);
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  // x=100 is the drawer's left edge; x=200 fills into the drawer (clipped),
  // and the Q control point pulls the edge out into the visible curve strip.
  const closedPath = `M100 0 L200 0 L200 ${height} L100 ${height} Q-90 ${height / 2} 100 0`;
  const openPath = `M100 0 L200 0 L200 ${height} L100 ${height} Q100 ${height / 2} 100 0`;

  return (
    <svg
      className="absolute top-0 -left-16 w-16 h-full fill-purple-dark stroke-none"
      shapeRendering="geometricPrecision"
      aria-hidden="true"
      style={{
        willChange: "d",
        transform: "translate3d(0, 0, 0)",
        backfaceVisibility: "hidden",
        WebkitBackfaceVisibility: "hidden",
      }}
    >
      <motion.path
        variants={{
          open: {
            d: openPath,
            transition: { duration: 0.9, ease: EASE_SILK },
          },
          closed: {
            d: closedPath,
            transition: { duration: 0.8, ease: EASE_SILK },
          },
        }}
        initial="closed"
        animate="open"
        exit="closed"
      />
    </svg>
  );
};

export default Navbar;
