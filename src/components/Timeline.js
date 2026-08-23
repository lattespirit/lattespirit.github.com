import React, {
  Fragment,
  useEffect,
  useMemo,
  useRef,
  useState,
  useId,
} from "react";
import { graphql, useStaticQuery } from "gatsby";
import Fireworks from "./Fireworks";
import NewTag from "./NewTag";
import "./timeline.css";

const parseDate = (date) => {
  const [, year, month, day] = /^(\d{4})-(\d{2})-(\d{2})$/.exec(date) || [];
  return { year, month, day };
};

const isNewPost = (date) => Date.now() - new Date(date) < 24 * 3600 * 30 * 1000;

// Offset + frame for each floating screenshot, indexed by image position.
const FLOAT_LAYOUTS = [
  { right: "6%", top: "50%", width: "58%", y: "-50%" },
  { right: "30%", top: "50%", width: "46%", y: "-42%" },
  { right: "54%", top: "50%", width: "36%", y: "-58%" },
];

// Curved connector that bridges two timeline nodes. Decorative only: it is
// aria-hidden and ignores pointer events, so drag/scroll pass straight through.
const TimelineArrow = ({ index }) => {
  const rawId = useId();
  const id = rawId.replace(/:/g, "");
  const gradId = `timeline-grad-${id}`;
  const markerId = `timeline-mark-${id}`;

  return (
    <svg
      aria-hidden="true"
      className="timeline-arrow shrink-0 mx-1.5 w-8 h-5 lg:w-10 lg:h-6"
      viewBox="0 0 36 24"
      fill="none"
      style={{ animationDelay: `${index * 70}ms` }}
    >
      <defs>
        <linearGradient id={gradId} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#ed6b9d" />
          <stop offset="100%" stopColor="#ff8aa0" />
        </linearGradient>
        <marker
          id={markerId}
          viewBox="0 0 10 10"
          refX="7.5"
          refY="5"
          markerWidth="5.5"
          markerHeight="5.5"
          orient="auto"
        >
          <path
            d="M0 0 L10 5 L0 10 Z"
            fill="#ff8aa0"
            stroke="#ff8aa0"
            strokeWidth="1"
            strokeLinejoin="round"
          />
        </marker>
      </defs>
      <path
        d="M2 20 C 5 1 27 12 34 20"
        stroke={`url(#${gradId})`}
        strokeWidth="3"
        strokeLinecap="round"
        markerEnd={`url(#${markerId})`}
      />
    </svg>
  );
};

const Timeline = () => {
  const data = useStaticQuery(graphql`
    query TimelineQuery {
      allEventsJson {
        edges {
          node {
            date
            content
            effects
            images {
              alt
              path {
                publicURL
              }
            }
          }
        }
      }
    }
  `);

  const events = useMemo(
    () =>
      data.allEventsJson.edges
        .map(({ node }) => ({
          ...node,
          ...parseDate(node.date),
          isNew: isNewPost(node.date),
        }))
        .sort((a, b) => a.date.localeCompare(b.date)),
    [data],
  );

  const [selectedDate, setSelectedDate] = useState(events[0]?.date);
  const selected =
    events.find((event) => event.date === selectedDate) ?? events[0];

  const hoverTimer = useRef(null);
  const stripRef = useRef(null);
  const dragRef = useRef(false);
  const dragStartXRef = useRef(0);
  const dragStartScrollRef = useRef(0);
  const [dragging, setDragging] = useState(false);
  const [moreLeft, setMoreLeft] = useState(false);
  const [moreRight, setMoreRight] = useState(false);

  const updateScrollState = () => {
    const el = stripRef.current;
    if (!el) return;
    setMoreLeft(el.scrollLeft > 1);
    setMoreRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 1);
  };

  const reducedMotion = () =>
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const scrollStrip = (dir) => {
    const el = stripRef.current;
    if (!el) return;
    el.scrollBy({
      left: 180 * dir,
      behavior: reducedMotion() ? "auto" : "smooth",
    });
  };

  const handlePointerDown = (e) => {
    if (e.pointerType !== "mouse" || e.button !== 0) return;
    const el = stripRef.current;
    if (!el) return;
    dragRef.current = true;
    dragStartXRef.current = e.clientX;
    dragStartScrollRef.current = el.scrollLeft;
    e.preventDefault();
    el.setPointerCapture(e.pointerId);
    setDragging(true);
  };

  const handlePointerMove = (e) => {
    if (!dragRef.current) return;
    const el = stripRef.current;
    if (!el) return;
    el.scrollLeft =
      dragStartScrollRef.current - (e.clientX - dragStartXRef.current);
  };

  const handlePointerEnd = (e) => {
    if (!dragRef.current) return;
    dragRef.current = false;
    const el = stripRef.current;
    if (el && e.pointerId != null && el.hasPointerCapture(e.pointerId)) {
      el.releasePointerCapture(e.pointerId);
    }
    setDragging(false);
  };

  const handleTileEnter = (date) => {
    // Do not change the selection while the user is dragging the strip.
    if (dragRef.current) return;
    clearTimeout(hoverTimer.current);
    hoverTimer.current = setTimeout(() => setSelectedDate(date), 200);
  };

  const handleTileLeave = () => {
    clearTimeout(hoverTimer.current);
  };

  const handleKeySelect = (event, date) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      setSelectedDate(date);
    } else if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
      event.preventDefault();
      scrollStrip(event.key === "ArrowRight" ? 1 : -1);
    }
  };

  useEffect(() => () => clearTimeout(hoverTimer.current), []);

  useEffect(() => {
    updateScrollState();
    window.addEventListener("resize", updateScrollState);
    return () => window.removeEventListener("resize", updateScrollState);
  }, []);

  const renderFloatingImages = () => {
    const images = selected?.images ?? [];
    const hasFireworks = selected?.effects?.includes("fireworks");

    if (!images.length) return null;

    return (
      <div className="relative w-full h-80">
        {images.map((image, index) => (
          <div
            key={image.path.publicURL}
            className="absolute"
            style={{
              ...FLOAT_LAYOUTS[index % FLOAT_LAYOUTS.length],
              transform: `translateY(${FLOAT_LAYOUTS[index % FLOAT_LAYOUTS.length].y}) rotate(${
                index % 2 === 0 ? -2 : 2
              }deg)`,
            }}
          >
            <img
              src={image.path.publicURL}
              alt={image.alt ?? ""}
              className="timeline-float w-full h-auto object-contain rounded-lg"
            />
          </div>
        ))}

        {hasFireworks && (
          <>
            <Fireworks
              style={{ position: "absolute", left: "62%", top: "38%" }}
            />
            <Fireworks
              style={{ position: "absolute", left: "78%", top: "56%" }}
            />
          </>
        )}
      </div>
    );
  };

  const renderDesktopTile = (event) => {
    const isActive = event.date === selected?.date;

    return (
      <div
        className="flex shrink-0"
        aria-label={`${event.year}-${event.month}-${event.day}`}
        onMouseEnter={() => handleTileEnter(event.date)}
        onMouseLeave={handleTileLeave}
        onFocus={() => setSelectedDate(event.date)}
        onKeyDown={(e) => handleKeySelect(e, event.date)}
        role="link"
        tabIndex={0}
      >
        <div
          className={`group relative flex flex-col items-center justify-center w-32 py-4 rounded-xl transition-colors duration-200 ${
            isActive
              ? "bg-gradient-to-b from-gray-light to-gray-lighter text-purple-light shadow-xl shadow-purple-dark/30 ring-1 ring-sunset-light/50"
              : "bg-white/10 ring-1 ring-white/20 hover:bg-white/15 hover:ring-sunset-light/50"
          }`}
        >
          <span
            className={`block text-base font-bold tabular-nums leading-none tracking-tight transition-colors duration-200 ${
              isActive
                ? "text-purple-dark"
                : "text-white group-hover:text-sunset-light"
            }`}
          >
            {event.year}-{event.month}-{event.day}
          </span>

          {isActive && (
            <span className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 h-1 w-8 rounded-full bg-sunset-pink shadow" />
          )}
          {event.isNew && (
            <NewTag className="absolute top-0 right-0 mt-2 mr-2 text-xs" />
          )}
        </div>
      </div>
    );
  };

  const renderMobileTile = (event) => (
    <div
      className="flex mt-4"
      aria-label={`${event.year}-${event.month}-${event.day}`}
      onMouseEnter={() => handleTileEnter(event.date)}
      onMouseLeave={handleTileLeave}
      onFocus={() => setSelectedDate(event.date)}
      onKeyDown={(e) => handleKeySelect(e, event.date)}
      role="link"
      tabIndex={0}
    >
      <div className="flex w-full">
        <span className="w-28 text-white text-xs text-left x:mr-4">
          {event.date}
        </span>
        <div className="relative w-full grow bg-gray-lighter opacity-85 rounded-lg text-xs text-left text-gray-darkest px-4 py-2 overflow-hidden">
          {event.images?.[0]?.path?.publicURL && (
            <img
              src={event.images[0].path.publicURL}
              alt=""
              aria-hidden="true"
              className="pointer-events-none absolute right-0 top-0 h-full w-1/2 object-cover object-center opacity-15"
            />
          )}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-gray-lighter/95 via-gray-lighter/40 to-transparent" />
          <div
            className="relative"
            dangerouslySetInnerHTML={{ __html: event.content }}
          />
        </div>
      </div>
    </div>
  );

  const stripMask = `linear-gradient(90deg, ${
    moreLeft ? "rgba(0,0,0,0) 0, rgba(0,0,0,1) 44px" : "rgba(0,0,0,1) 0"
  }, rgba(0,0,0,1) calc(100% - 44px), ${
    moreRight ? "rgba(0,0,0,0) 100%" : "rgba(0,0,0,1) 100%"
  })`;

  return (
    <div className="w-76 md:w-100 lg:w-240 mx-auto x:w-auto md:mx-auto x:mx-6 my-16">
      <div className="lg:w-200 mx-auto animate-fade-in">
        <p className="text-white text-center text-xl lg:text-3xl font-bold tracking-tight">
          这些年
        </p>

        <div className="hidden lg:flex justify-between items-center mt-16">
          <div className="flex flex-col w-80">
            <p className="text-white text-left text-3xl font-bold tabular-nums tracking-tight">
              {selected?.date}
            </p>
            <div className="w-full grow lg:bg-transparent lg:mt-4">
              <p
                key={selected?.date}
                className="text-left text-white font-bold timeline-detail"
                dangerouslySetInnerHTML={{ __html: selected?.content }}
              />
            </div>
          </div>

          <div
            key={selected?.date}
            className="flex w-100 h-80 timeline-detail"
          >
            {renderFloatingImages()}
          </div>
        </div>

        {/* Desktop journey strip: one non-wrapping line; scrolls/drags when it
            overflows, and centers when the nodes fit. Connectors bridge the
            nodes so the sequence reads as a single path. */}
        <div className="relative mt-8 text-white">
          <div
            ref={stripRef}
            role="region"
            aria-label="博客大事件时间线"
            className={`timeline-strip hidden lg:block overflow-x-auto overscroll-x-contain select-none ${
              dragging ? "cursor-grabbing" : "cursor-grab"
            }`}
            style={{ WebkitMaskImage: stripMask, maskImage: stripMask }}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerEnd}
            onPointerCancel={handlePointerEnd}
            onPointerLeave={handlePointerEnd}
            onScroll={updateScrollState}
          >
            <div className="mx-auto flex w-max items-center px-4 py-3">
              {events.map((event, index) => (
                <Fragment key={event.date}>
                  {renderDesktopTile(event)}
                  {index < events.length - 1 && <TimelineArrow index={index} />}
                </Fragment>
              ))}
            </div>
          </div>

          {/* Mobile: stacked cards (unchanged behavior) */}
          <div className="lg:hidden">
            {events.map((event) => (
              <Fragment key={event.date}>{renderMobileTile(event)}</Fragment>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Timeline;
