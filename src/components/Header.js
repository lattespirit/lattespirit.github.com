import { Link } from "gatsby";
import React, { Component } from "react";

class Header extends Component {
  state = {
    open: false
  };

  open = () => {
    this.setState({ open: true });
  };

  close = () => {
    this.setState({ open: false });
  };

  toTypography = e => {
    window.location.href = "/logos";
    e.preventDefault();
  };

  render() {
    return (
      <header className="flex justify-between items-center box py-6">
        <Link
          to="/"
          className="text-white inline-block text-xl x:text-2xl font-semibold cursor-default no-underline"
          onContextMenu={this.toTypography}
        >
          Lattespirit
        </Link>
        <div
          className="flex justify-center items-center md:hidden"
          onClick={this.open}
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
        </div>

        <div className="hidden md:block self-end">
          <Link className="text-white inline-block mr-6 no-underline" to="/">
            Home
          </Link>
          <Link
            className="text-white inline-block mr-6 no-underline"
            to="/archives"
          >
            Archives
          </Link>
          <Link
            className="text-white inline-block mr-6 no-underline"
            to="/testimonials"
          >
            Testimonials
          </Link>
          <Link
            className="text-white inline-block mr-6 no-underline"
            to="/about"
          >
            About
          </Link>
        </div>
        {this.state.open && (
          <div
            className="fixed w-full h-full max-h-full inset-0 bg-purple-dark z-10"
            v-if="isNavBarOpened"
          >
            <div
              className="flex justify-between items-center box py-6"
              onClick={this.close}
            >
              <a
                className="invisible text-white inline-block text-xl x:text-2xl font-extrabold"
                href="/"
              >
                Lattespirit
              </a>
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
            </div>
            <div className="w-20 mx-auto text-center">
              <Link to="/" className="block text-white py-4 no-underline">
                Home
              </Link>
              <Link
                to="/archives"
                className="block text-white py-4 no-underline"
              >
                Archives
              </Link>
              <Link to="/uses" className="block text-white py-4 no-underline">
                Uses
              </Link>
              <Link
                to="/testimonials"
                className="block text-white py-4 no-underline"
              >
                Testimonials
              </Link>
              <Link to="/logos" className="block text-white py-4 no-underline">
                Typography
              </Link>
              <Link to="/about" className="block text-white py-4 no-underline">
                About
              </Link>
            </div>
          </div>
        )}
      </header>
    );
  }
}

export default Header;
