import React from 'react';
import useSiteMetadata from '../hooks/useSiteMetadata';

const Footer = () => {
  const { author } = useSiteMetadata();

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
            className="no-underline text-white/70 hover:text-sunset-light transition-colors duration-200"
            href="/rss.xml"
          >
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
