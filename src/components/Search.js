import React, { useState, useEffect, useRef } from "react";
import { graphql, useStaticQuery, navigate } from "gatsby";
import {
  Combobox,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
} from "@headlessui/react";
import { motion, AnimatePresence } from "framer-motion";
import Fuse from "fuse.js";
import {
  ArrowUturnRightIcon,
  ArrowDownCircleIcon,
  ArrowUpCircleIcon,
  XCircleIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/solid";
import { useClickAway } from "@uidotdev/usehooks";

const Empty = () => (
  <div className="rounded-lg my-6 text-sm sm:text-base text-center">
    <p>
      匆匆的
      <span className="font-bold text-purple-dark">搜索结果</span>
      转眼已消逝
    </p>
    <p className="mt-4">有几多青春美丽</p>
  </div>
);

export default function Search() {
  const data = useStaticQuery(graphql`
    query sitePosts {
      allMdx(sort: { fields: { date: DESC } }) {
        posts: nodes {
          excerpt(pruneLength: 10000)
          frontmatter {
            title
          }
          fields {
            slug
            date
          }
        }
      }
      site {
        siteMetadata {
          url
        }
      }
    }
  `);

  const posts =
    data.allMdx.posts.map((post) => ({
      title: post.frontmatter.title,
      url: `/${post.fields.slug}`,
      content: post.excerpt,
      date: post.fields.date,
    })) || [];

  const [query, setQuery] = useState("");
  const [selectedPost, setSelectedPost] = useState();
  const [isOpen, setIsOpen] = useState(false);
  const inputRef = useRef(null);

  const fuse = new Fuse(posts, {
    shouldSort: true,
    threshold: 0.6,
    location: 0,
    distance: 1000,
    maxPatternLength: 32,
    minMatchCharLength: 1,
    keys: ["title", "content", "url"],
  });

  const safeQuery = typeof query === "string" ? query : "";

  const filteredOptions =
    safeQuery.trim() === ""
      ? posts
      : fuse.search(safeQuery).map((result) => result.item);

  const ref = useClickAway(() => {
    setIsOpen(false);
  });

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (document.activeElement.tagName === "INPUT") {
        if (event.key === "Escape") {
          event.preventDefault();
          setIsOpen(false);
        }
        return;
      }

      if ((event.metaKey || event.ctrlKey) && event.key === "k") {
        event.preventDefault();
        setIsOpen(true);
      } else if (event.key === "s" && !event.metaKey && !event.ctrlKey) {
        event.preventDefault();
        setIsOpen(true);
      } else if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isOpen]);

  const handleSelect = (post) => {
    if (post) {
      setSelectedPost(post);
      setQuery(post.title);
      navigate(post.url);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          variants={{
            open: {
              opacity: 1,
              scale: 1,
              transition: {
                scale: { type: "spring", stiffness: 150 },
              },
            },
            closed: {
              opacity: 0,
              scale: 0.95,
            },
            exit: {
              opacity: 0,
              scale: 0.95,
              transition: {
                duration: 0.2,
              },
            },
          }}
          initial="closed"
          animate="open"
          exit="exit"
          className="hidden lg:block fixed inset-0 bg-purple-dark/40 backdrop-blur-md will-change-transform"
        >
          <div
            ref={ref}
            className="relative w-1/2 mx-auto mt-12 bg-white/70 backdrop-blur-lg rounded-lg shadow-lg p-4 pb-10"
          >
            <button
              className="absolute -top-4 -right-5 cursor-pointer"
              onClick={() => setIsOpen(false)}
              aria-label="Close search"
            >
              <XCircleIcon className="text-white size-8" />
            </button>

            <Combobox value={selectedPost} onChange={handleSelect}>
              <div className="flex items-center rounded-lg px-4 py-3 bg-white/80 backdrop-blur-md shadow-sm">
                <MagnifyingGlassIcon className="size-6 text-purple-dark" />
                <ComboboxInput
                  ref={inputRef}
                  className="w-full border-none focus:outline-none px-2 bg-transparent"
                  placeholder="Search..."
                  displayValue={(post) => post?.title || ""}
                  onKeyDown={(e) => {
                    if (e.key === "Tab") {
                      // Default behavior:
                      // Selects the currently focused item and closes the combobox
                      // disable it
                      e.preventDefault();
                    }
                  }}
                  onChange={(event) => {
                    setQuery(event.target.value || "");
                  }}
                />
              </div>
              <div className="py-4 h-full overflow-auto mask-b-from-90%">
                <ComboboxOptions
                  data-open
                  transition
                  className="origin-top transition duration-200 ease-out empty:invisible data-[closed]:scale-95 data-[closed]:opacity-0"
                  style={{ maxHeight: "60vh" }}
                >
                  {filteredOptions.map((post) => (
                    <ComboboxOption
                      key={post?.url}
                      value={post}
                      className="group flex flex-col gap-2 px-4 py-2 cursor-pointer rounded-lg data-[focus]:bg-purple-dark/30"
                    >
                      <div className="flex justify-between">
                        <span className="text-purple-dark/80 font-bold">
                          {post?.title || "Untitled"}
                        </span>
                        <span className="text-gray-darkest text-sm">
                          {post?.date || ""}
                        </span>
                      </div>
                      <div className="flex gap-4">
                        <span className="text-sm text-purple-dark/70">
                          {(post?.content || "").slice(0, 80)}...
                        </span>
                        <div className="w-4 h-4 ml-auto">
                          <ArrowUturnRightIcon className="invisible size-5 ml-auto group-data-[focus]:visible" />
                        </div>
                      </div>
                    </ComboboxOption>
                  ))}
                  {filteredOptions.length === 0 && <Empty />}
                </ComboboxOptions>
              </div>
            </Combobox>

            <div className="absolute inset-x-0 px-4">
              <div className="h-8 flex items-center gap-6 px-4 bg-pink-dark/80 rounded-lg">
                <div className="flex items-center gap-1">
                  <ArrowUpCircleIcon className="size-6 text-white" />
                  <ArrowDownCircleIcon className="size-6 text-white" />
                  <span className="text-sm text-gray-light/90">to Navigate</span>
                </div>
                <div className="flex items-center gap-1">
                  <ArrowUturnRightIcon className="size-4 text-white" />
                  <span className="text-sm text-gray-light/90">
                    to Open
                  </span>
                </div>
                <div className="ml-auto text-gray-lighter text-sm">
                  Press{" "}
                  <span className="font-bold text-purple-dark/65">Esc</span> to
                  Clear/Close
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
