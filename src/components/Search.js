import React, { useMemo, useState, useEffect, useLayoutEffect, useRef } from "react";
import { graphql, useStaticQuery, navigate } from "gatsby";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import {
  Combobox,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
} from "@headlessui/react";
import Fuse from "fuse.js";
import {
  ArrowUturnRightIcon,
  ArrowDownCircleIcon,
  ArrowUpCircleIcon,
  XCircleIcon,
  TrashIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/solid";
import { useClickAway } from "@uidotdev/usehooks";
import { EASE_OUT } from "../lib/motion.js";

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

const escapeRegExp = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const countOccurrences = (text, query) => {
  const source = typeof text === "string" ? text : "";
  const q = typeof query === "string" ? query.trim() : "";
  if (!source || !q) return 0;

  const matches = source.match(new RegExp(escapeRegExp(q), "ig"));
  return matches ? matches.length : 0;
};

const highlightText = (text, query) => {
  const safeText = typeof text === "string" ? text : "";
  const q = typeof query === "string" ? query.trim() : "";
  if (!q) return safeText;

  const regex = new RegExp(`(${escapeRegExp(q)})`, "ig");
  const parts = safeText.split(regex);
  const exactMatch = new RegExp(`^${escapeRegExp(q)}$`, "i");

  return parts.map((part, index) => {
    if (!part) return null;
    if (exactMatch.test(part)) {
      return (
        <span
          key={`${part}-${index}`}
          className="bg-sunset-lightest/70 text-silhouette-darkest rounded-sm px-0.5"
        >
          {part}
        </span>
      );
    }
    return <React.Fragment key={`${part}-${index}`}>{part}</React.Fragment>;
  });
};

const highlightByRanges = (text, ranges = []) => {
  const safeText = typeof text === "string" ? text : "";
  if (!safeText || !Array.isArray(ranges) || ranges.length === 0) return safeText;

  const normalizedRanges = ranges
    .filter(
      (range) =>
        Array.isArray(range) &&
        range.length === 2 &&
        Number.isFinite(range[0]) &&
        Number.isFinite(range[1]) &&
        range[0] <= range[1]
    )
    .map(([start, end]) => [Math.max(0, start), Math.min(safeText.length - 1, end)])
    .sort((a, b) => a[0] - b[0]);

  if (normalizedRanges.length === 0) return safeText;

  const mergedRanges = [];
  normalizedRanges.forEach(([start, end]) => {
    if (mergedRanges.length === 0) {
      mergedRanges.push([start, end]);
      return;
    }
    const last = mergedRanges[mergedRanges.length - 1];
    if (start <= last[1] + 1) {
      last[1] = Math.max(last[1], end);
    } else {
      mergedRanges.push([start, end]);
    }
  });

  const parts = [];
  let currentIndex = 0;

  mergedRanges.forEach(([start, end], index) => {
    if (currentIndex < start) {
      parts.push(
        <React.Fragment key={`text-${index}-${currentIndex}`}>
          {safeText.slice(currentIndex, start)}
        </React.Fragment>
      );
    }

    parts.push(
      <span
        key={`highlight-${index}-${start}`}
        className="bg-sunset-lightest/70 text-silhouette-darkest rounded-sm px-0.5"
      >
        {safeText.slice(start, end + 1)}
      </span>
    );

    currentIndex = end + 1;
  });

  if (currentIndex < safeText.length) {
    parts.push(
      <React.Fragment key={`tail-${currentIndex}`}>
        {safeText.slice(currentIndex)}
      </React.Fragment>
    );
  }

  return parts;
};

const buildSnippet = ({ content, query, matchIndex, matchRanges = [] }) => {
  const raw = typeof content === "string" ? content : "";
  if (!raw) return { text: "", hasLeadingEllipsis: false, hasTrailingEllipsis: false };

  const q = typeof query === "string" ? query.trim() : "";
  const before = 70;
  const after = Math.max(90, q.length * 6);
  const fallbackLength = 220;

  let start = 0;
  let end = Math.min(raw.length, fallbackLength);

  if (q && typeof matchIndex === "number" && Number.isFinite(matchIndex)) {
    start = Math.max(0, matchIndex - before);
    end = Math.min(raw.length, matchIndex + q.length + after);
  }

  const hasLeadingEllipsis = start > 0;
  const hasTrailingEllipsis = end < raw.length;
  const snippetRanges = Array.isArray(matchRanges)
    ? matchRanges
        .filter(
          (range) =>
            Array.isArray(range) &&
            range.length === 2 &&
            Number.isFinite(range[0]) &&
            Number.isFinite(range[1]) &&
            range[1] >= start &&
            range[0] <= end
        )
        .map(([rangeStart, rangeEnd]) => [
          Math.max(0, rangeStart - start),
          Math.min(end - start - 1, rangeEnd - start),
        ])
    : [];

  const text = raw.slice(start, end);
  return { text, hasLeadingEllipsis, hasTrailingEllipsis, highlightRanges: snippetRanges };
};

export default function Search() {
  const data = useStaticQuery(graphql`
    query sitePosts {
      allMdx(sort: { fields: { date: DESC } }) {
        posts: nodes {
          excerpt(pruneLength: 400)
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

  const posts = useMemo(
    () =>
      (data?.allMdx?.posts || []).map((post) => ({
        title: post.frontmatter.title,
        url: `/${post.fields.slug}`,
        content: post.excerpt,
        date: post.fields.date,
      })),
    [data?.allMdx?.posts]
  );

  const [query, setQuery] = useState("");
  const [selectedPost, setSelectedPost] = useState();
  const [isOpen, setIsOpen] = useState(false);
  const inputRef = useRef(null);
  const resultsRef = useRef(null);
  const queryRef = useRef("");
  const [resultsHeight, setResultsHeight] = useState(0);

  const fuse = useMemo(
    () =>
      new Fuse(posts, {
        shouldSort: true,
        threshold: 0.35,
        ignoreLocation: true,
        maxPatternLength: 32,
        minMatchCharLength: 1,
        includeScore: true,
        includeMatches: true,
        findAllMatches: true,
        keys: [
          { name: "title", weight: 0.45 },
          { name: "content", weight: 0.5 },
          { name: "url", weight: 0.05 },
        ],
      }),
    [posts]
  );

  const safeQuery = typeof query === "string" ? query : "";

  const searchResults = useMemo(() => {
    const q = safeQuery.trim();
    if (q === "") return posts.map((item) => ({ item, matches: [] }));

    const fuseResults = fuse.search(q);
    const fuseByUrl = new Map(
      fuseResults.map((result) => [result?.item?.url, result])
    );

    const ranked = posts
      .map((post) => {
        const titleHits = countOccurrences(post?.title, q);
        const contentHits = countOccurrences(post?.content, q);
        const urlHits = countOccurrences(post?.url, q);
        const totalHits = titleHits + contentHits + urlHits;
        const fuseResult = fuseByUrl.get(post?.url);

        if (!fuseResult && totalHits === 0) return null;

        return {
          item: post,
          matches: fuseResult?.matches || [],
          score: fuseResult?.score ?? 1,
          titleHits,
          contentHits,
          totalHits,
        };
      })
      .filter(Boolean)
      .sort((a, b) => {
        if (a.titleHits !== b.titleHits) return b.titleHits - a.titleHits;
        if (a.contentHits !== b.contentHits) return b.contentHits - a.contentHits;
        if (a.totalHits !== b.totalHits) return b.totalHits - a.totalHits;
        return a.score - b.score;
      });

    return ranked.map(({ item, matches }) => ({ item, matches }));
  }, [fuse, posts, safeQuery]);

  // Measure the results' natural height so the panel grows/shrinks smoothly as
  // the result set changes (instead of jumping straight to the new height). We
  // animate the real height, not a transform, so content reflows cleanly and
  // never gets squished. The options list only mounts when the query is
  // non-empty, so every mount/resize is tracked by these deps. We read the child
  // listbox's offsetHeight (not the container's scrollHeight) — on an
  // overflow-hidden, height-animated box, scrollHeight returns
  // max(clientHeight, contentHeight), so a shrink to a smaller result set would
  // be masked by the current height and the panel would stay stuck. The child's
  // offsetHeight always reflects the real content box, independent of the
  // animated container height.
  useLayoutEffect(() => {
    if (!isOpen) return;
    const el = resultsRef.current;
    if (!el) return;
    const content = el.firstElementChild;
    setResultsHeight(content ? content.offsetHeight : 0);
  }, [searchResults, safeQuery, isOpen]);

  const ref = useClickAway(() => {
    setIsOpen(false);
  });

  const clearSearch = () => {
    setQuery("");
    setSelectedPost(undefined);
    if (inputRef.current) {
      inputRef.current.value = "";
      inputRef.current.focus();
    }
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (document.activeElement.tagName === "INPUT") {
        if (event.key === "Escape") {
          event.preventDefault();
          if (queryRef.current.trim() !== "") {
            clearSearch();
          } else {
            setIsOpen(false);
          }
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
    queryRef.current = query;
  }, [query]);

  useEffect(() => {
    const handleOpenSearch = () => {
      setIsOpen(true);
    };

    window.addEventListener("open-search", handleOpenSearch);
    return () => {
      window.removeEventListener("open-search", handleOpenSearch);
    };
  }, []);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
      setQuery("");
      setSelectedPost(undefined);
    }
  }, [isOpen]);

  const handleSelect = (post) => {
    if (post) {
      setSelectedPost(post);
      setQuery(post.title);
      navigate(post.url);
      setIsOpen(false);
    }
  };

  const prefersReducedMotion = useReducedMotion();

  // Scrim: a gentle opacity fade (+ blur materialize for the glass layer).
  const overlayTransition = prefersReducedMotion
    ? { duration: 0.2 }
    : { duration: 0.26, ease: EASE_OUT };

  const overlayVariants = prefersReducedMotion
    ? { hidden: { opacity: 0 }, visible: { opacity: 1 }, exit: { opacity: 0 } }
    : {
        hidden: { opacity: 0, backdropFilter: "blur(0px) saturate(100%)" },
        visible: { opacity: 1, backdropFilter: "blur(12px) saturate(100%)" },
        exit: { opacity: 0, backdropFilter: "blur(0px) saturate(100%)" },
      };

  // Panel: critically damped spring (no overshoot) that materializes the glass,
  // scaling/blurring in as it settles from just above. Anchored at the search
  // field (top-center) so it reads as Spotlight emerging from its source rather
  // than a whole-window zoom. Enter and exit travel the same path. Reduced
  // motion falls back to a plain opacity cross-fade.
  const panelTransition = prefersReducedMotion
    ? { duration: 0.2, ease: "easeOut" }
    : { type: "spring", bounce: 0, duration: 0.4 };

  const panelVariants = prefersReducedMotion
    ? { hidden: { opacity: 0 }, visible: { opacity: 1 }, exit: { opacity: 0 } }
    : {
        hidden: {
          opacity: 0,
          scale: 0.96,
          y: -10,
          backdropFilter: "blur(0px) saturate(100%)",
        },
        visible: {
          opacity: 1,
          scale: 1,
          y: 0,
          backdropFilter: "blur(20px) saturate(160%)",
        },
        exit: {
          opacity: 0,
          scale: 0.96,
          y: -10,
          backdropFilter: "blur(0px) saturate(100%)",
        },
      };

  // Results: the Tahoe Spotlight signature — the result rows emerge out from
  // under the search field with a slightly delayed spring, then retract back up
  // into the field on the way out. We animate the measured height so the panel
  // grows and shrinks smoothly (no jump) without distorting the content.
  const resultsTransition = prefersReducedMotion
    ? { duration: 0.2, ease: "easeOut" }
    : {
        height: { type: "spring", bounce: 0, duration: 0.5 },
        opacity: { type: "spring", bounce: 0, duration: 0.4 },
        filter: { duration: 0.3 },
      };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="search-overlay"
            className="fixed inset-0 bg-purple-dark/40 backdrop-blur-md z-40 will-change-[opacity,backdrop-filter]"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={overlayVariants}
            transition={overlayTransition}
          >
            <motion.div
              ref={ref}
              className="relative w-[calc(100%-1.5rem)] sm:w-[90%] md:w-[80%] lg:w-[70%] xl:w-1/2 max-w-5xl mx-auto mt-4 sm:mt-8 md:mt-12 bg-white/60 backdrop-blur-lg border-t border-white/50 rounded-lg shadow-2xl p-4 pb-10 will-change-transform"
              style={{ transformOrigin: "50% 8%" }}
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={panelVariants}
              transition={panelTransition}
            >
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
                <button
                  type="button"
                  className="cursor-pointer"
                  onClick={clearSearch}
                  aria-label="Clear search"
                >
                  <TrashIcon className="size-5 text-purple-dark/75" />
                </button>
                <button
                  type="button"
                  className="cursor-pointer ml-2"
                  onClick={() => setIsOpen(false)}
                  aria-label="Close search"
                >
                  <XCircleIcon className="size-6 text-purple-dark/75" />
                </button>
              </div>
              <div className="lg:py-4 mask-b-from-90%">
                <motion.div
                  ref={resultsRef}
                  className="overflow-hidden"
                  style={{ transformOrigin: "50% 0%" }}
                  initial={
                    prefersReducedMotion
                      ? { opacity: 0 }
                      : { height: 0, opacity: 0, filter: "blur(8px)" }
                  }
                  animate={
                    prefersReducedMotion
                      ? { opacity: 1 }
                      : {
                          height: safeQuery.trim() !== "" ? resultsHeight || 0 : 0,
                          opacity: 1,
                          filter: "blur(0px)",
                        }
                  }
                  transition={resultsTransition}
                >
                  {safeQuery.trim() !== "" && (
                      <ComboboxOptions
                        key={safeQuery}
                        data-open
                        transition
                        className="origin-top overflow-auto transition-opacity duration-200 ease-out empty:invisible data-closed:opacity-0"
                        style={{ maxHeight: "60vh" }}
                      >
                  {searchResults.map((result) => {
                    const post = result?.item;
                    const titleMatch = result?.matches?.find(
                      (match) =>
                        match?.key === "title" &&
                        Array.isArray(match?.indices) &&
                        match.indices.length > 0
                    );
                    const contentMatch = result?.matches?.find(
                      (match) =>
                        match?.key === "content" &&
                        Array.isArray(match?.indices) &&
                        match.indices.length > 0 &&
                        Array.isArray(match.indices[0])
                    );
                    const matchIndex = contentMatch?.indices?.[0]?.[0];
                    const snippet = buildSnippet({
                      content: post?.content || "",
                      query: safeQuery,
                      matchIndex,
                      matchRanges: contentMatch?.indices || [],
                    });

                    return (
                      <ComboboxOption
                        key={post?.url}
                        value={post}
                        className="group relative flex flex-col gap-2 px-4 py-2 cursor-pointer rounded-lg transition-colors duration-150 data-focus:bg-purple-dark/25"
                      >
                        <span
                          aria-hidden="true"
                          className="absolute left-0 top-1/2 -translate-y-1/2 h-6 w-0.5 rounded-full bg-pink-dark opacity-0 transition-opacity duration-150 group-data-focus:opacity-100"
                        />
                        <div className="flex items-center justify-between">
                          <span className="text-purple-dark/80 font-bold transition-colors duration-150 group-data-focus:text-purple-dark">
                            {titleMatch?.indices?.length
                              ? highlightByRanges(post?.title || "Untitled", titleMatch.indices)
                              : highlightText(post?.title || "Untitled", safeQuery)}
                          </span>
                          <span className="text-gray-darkest text-sm">
                            {post?.date || ""}
                          </span>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="min-w-0 flex-1 text-sm text-purple-dark/70 transition-colors duration-150 group-data-focus:text-purple-dark/85">
                            {snippet.hasLeadingEllipsis ? "…" : null}
                            {snippet.highlightRanges?.length
                              ? highlightByRanges(snippet.text, snippet.highlightRanges)
                              : highlightText(snippet.text, safeQuery)}
                            {snippet.hasTrailingEllipsis ? "…" : null}
                          </span>
                          <span className="hidden lg:flex w-5 shrink-0 items-center justify-center">
                            <ArrowUturnRightIcon className="w-5 h-5 opacity-0 scale-75 transition-all duration-150 group-data-focus:opacity-100 group-data-focus:scale-100" />
                          </span>
                        </div>
                      </ComboboxOption>
                    );
                  })}
                  {searchResults.length === 0 && <Empty />}
                      </ComboboxOptions>
                    )}
                </motion.div>
              </div>
            </Combobox>

            <div className="absolute inset-x-0 px-4 hidden lg:block">
              <div className="h-8 flex items-center gap-6 px-4 bg-pink-dark/80 rounded-lg">
                <div className="flex items-center gap-1">
                  <ArrowUpCircleIcon className="size-6 text-white" />
                  <ArrowDownCircleIcon className="size-6 text-white" />
                  <span className="text-sm text-gray-light/90">
                    to Navigate
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <ArrowUturnRightIcon className="size-4 text-white" />
                  <span className="text-sm text-gray-light/90">to Open</span>
                </div>
                <div className="ml-auto text-gray-lighter text-sm">
                  Press{" "}
                  <span className="font-bold text-purple-dark/65">Esc</span> to
                  Clear/Close
                </div>
              </div>
            </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
