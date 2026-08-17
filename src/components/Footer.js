import React, { useEffect, useRef } from 'react';
import useSiteMetadata from '../hooks/useSiteMetadata';
import RssMorphIcon from '../components/icons/RssMorph';

const Footer = () => {
  const { author } = useSiteMetadata();
  const rssIconRef = useRef(null);
  const pulseTimerRef = useRef(null);
  const navTimerRef = useRef(null);
  const tapPulseRef = useRef(false);

  const pulseRss = () => {
    rssIconRef.current?.pulse();
    clearTimeout(pulseTimerRef.current);
    pulseTimerRef.current = setTimeout(() => rssIconRef.current?.restore(), 600);
  };

  const releaseRss = () => {
    clearTimeout(pulseTimerRef.current);
    rssIconRef.current?.restore();
  };

  const handleRssPointerDown = (e) => {
    if (e.pointerType === "touch") {
      tapPulseRef.current = true;
      pulseRss();
    }
  };

  const handleRssClick = (e) => {
    if (!tapPulseRef.current) return;
    tapPulseRef.current = false;
    e.preventDefault();
    // Reduced motion: jump straight to the feed instead of delaying.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      window.location.href = "/rss.xml";
      return;
    }
    // Let the spring pulse play on mobile, then continue to the feed.
    clearTimeout(navTimerRef.current);
    navTimerRef.current = setTimeout(() => {
      window.location.href = "/rss.xml";
    }, 800);
  };

  useEffect(
    () => () => {
      clearTimeout(pulseTimerRef.current);
      clearTimeout(navTimerRef.current);
    },
    []
  );

  return (
    <footer className="box text-white/70 text-xs x:text-sm mt-auto pb-10">
      <div className="border-t border-white/10 pt-6 flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
        <p className="text-center sm:text-left">
          © 2012 - {new Date().getFullYear()} {author} · Design with{' '}
          <span role="img" aria-label="love">
            ❤️
          </span>
        </p>
        <div className="flex items-center gap-5">
          <a
            className="no-underline text-white/70 hover:text-sunset-light transition-colors duration-200 inline-flex items-center gap-1.5"
            href="/rss.xml"
            onMouseEnter={pulseRss}
            onMouseLeave={releaseRss}
            onFocus={pulseRss}
            onBlur={releaseRss}
            onPointerDown={handleRssPointerDown}
            onClick={handleRssClick}
          >
            <RssMorphIcon ref={rssIconRef} size={20} />
            RSS
          </a>
          {/* <a
            className="no-underline text-white/70 hover:text-sunset-light transition-colors duration-200"
            href="https://dribbble.com/febinraj"
            target="_blank"
            rel="noopener noreferrer"
          >
            Image from Febin_Raj
          </a> */}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
