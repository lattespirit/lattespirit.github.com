import React, { useState, useEffect, useRef } from "react";
import { graphql, useStaticQuery, navigate } from "gatsby";
import { Combobox } from "@headlessui/react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X } from "lucide-react";
import Fuse from "fuse.js";

export default function SearchBox() {
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

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (document.activeElement.tagName === "INPUT") return;

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
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 bg-white/20 backdrop-blur-md"
        >
          <div className="relative w-96 mx-auto mt-12 bg-white/70 backdrop-blur-lg rounded-lg shadow-lg p-4">
            <button
              className="absolute -top-2 -right-2 text-gray-400 hover:text-gray-700"
              onClick={() => setIsOpen(false)}
              aria-label="Close search"
            >
              <X className="w-5 h-5" />
            </button>

            <Combobox value={selectedPost} onChange={handleSelect}>
              <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2 bg-white/80 backdrop-blur-md shadow-sm">
                <Search className="w-5 h-5 text-gray-400" />
                <Combobox.Input
                  ref={inputRef}
                  className="w-full border-none focus:ring-0 px-2 bg-transparent"
                  placeholder="Search..."
                  onChange={(event) => {
                    setQuery(event.target.value || "");
                  }}
                />
              </div>
              <div className="mt-2 max-h-80 overflow-auto">
                <Combobox.Options className="py-2 border border-gray-300 rounded-lg bg-white/80 backdrop-blur-md shadow-lg">
                  {filteredOptions.length > 0 ? (
                    filteredOptions.map((post) => (
                      <Combobox.Option
                        key={post?.title}
                        value={post || {}}
                        className={({ active }) =>
                          `px-4 py-2 cursor-pointer ${active ? "bg-gray-200" : ""}`
                        }
                      >
                        <div className="font-medium">
                          {post?.title || "Untitled"}
                        </div>
                        <div className="text-sm text-gray-500">
                          {(post?.content || "").slice(0, 80)}...
                        </div>
                      </Combobox.Option>
                    ))
                  ) : (
                    <div className="px-4 py-2 text-gray-500">Nothing found</div>
                  )}
                </Combobox.Options>
              </div>
            </Combobox>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
