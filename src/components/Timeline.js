import React, { useEffect, useMemo, useRef, useState } from "react";
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

  useEffect(() => () => clearTimeout(hoverTimer.current), []);

  const handleTileEnter = (date) => {
    clearTimeout(hoverTimer.current);
    hoverTimer.current = setTimeout(() => setSelectedDate(date), 200);
  };

  const handleTileLeave = () => {
    clearTimeout(hoverTimer.current);
  };

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

  const handleKeySelect = (event, date) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      setSelectedDate(date);
    }
  };

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

        <div className="lg:flex lg:flex-wrap lg:justify-center lg:gap-3 mt-8 text-white">
          {events.map((event) => {
            const isActive = event.date === selected?.date;

            return (
              <div
                className="flex mt-4 lg:mt-0"
                key={event.date}
                onMouseEnter={() => handleTileEnter(event.date)}
                onMouseLeave={handleTileLeave}
                onFocus={() => setSelectedDate(event.date)}
                onKeyDown={(e) => handleKeySelect(e, event.date)}
                role="link"
                tabIndex={0}
              >
                {/* Mobile: content card with a translucent image on the right */}
                <div className="lg:hidden flex w-full">
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

                {/* Desktop: selectable tile */}
                <div
                  className={`group hidden relative lg:flex flex-col items-center justify-center w-32 py-4 rounded-xl transition-colors duration-200 ${
                    isActive
                      ? "bg-gradient-to-b from-gray-light to-gray-lighter text-purple-light shadow-xl shadow-purple-dark/30 ring-1 ring-sunset-light/50"
                      : "bg-white/10 ring-1 ring-white/20 hover:bg-white/15 hover:ring-sunset-light/50"
                  }`}
                >
                  <span
                    className={`block text-2xl tabular-nums font-bold tracking-tight transition-colors duration-200 ${
                      isActive
                        ? "text-purple-light"
                        : "text-white group-hover:text-sunset-light"
                    }`}
                  >
                    {event.year}-{event.month}
                  </span>
                  <span
                    className={`block text-lg font-bold tabular-nums transition-colors duration-200 ${
                      isActive
                        ? "text-purple-dark/90"
                        : "text-white/70 group-hover:text-sunset-light"
                    }`}
                  >
                    {event.day}
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
          })}
        </div>
      </div>
    </div>
  );
};

export default Timeline;
