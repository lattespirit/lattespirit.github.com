import { Link } from 'gatsby';
import React, { Component } from 'react';

class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
    };
  }

  open = () => {
    this.setState({ open: true });
  };

  close = () => {
    this.setState({ open: false });
  };

  keydown = () => {};

  toTypography = (e) => {
    window.location.href = '/logos';
    e.preventDefault();
  };

  render() {
    const { open } = this.state;
    const mdMenus = [
      { title: 'Home', url: '/' },
      { title: 'Archives', url: '/archives' },
      { title: 'Testimonials', url: '/testimonials' },
      { title: 'About', url: '/about' },
    ];

    const smMenus = [
      { title: 'Home', url: '/' },
      { title: 'Archives', url: '/archives' },
      { title: 'Uses', url: '/uses' },
      { title: 'Testimonials', url: '/testimonials' },
      { title: 'Typography', url: '/logos' },
      { title: 'About', url: '/about' },
    ];

    return (
      <header className="flex justify-between items-center box py-6">
        <Link
          to="/"
          className="text-white inline-block text-xl x:text-2xl font-semibold cursor-default no-underline"
          onContextMenu={this.toTypography}
          onKeyDown={this.keydown}
        >
          Lattespirit
        </Link>
        <div
          className="flex justify-center items-center md:hidden"
          onClick={this.open}
          onKeyDown={this.keydown}
          role="link"
          tabIndex={0}
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
          {mdMenus.map((menu) => {
            return (
              <Link
                className="text-white inline-block pl-6 no-underline"
                to={menu.url}
              >
                {menu.title}
              </Link>
            );
          })}
        </div>
        {open && (
          <div
            className="fixed w-full h-full max-h-full inset-0 bg-purple-dark z-10"
            v-if="isNavBarOpened"
          >
            <div
              className="flex justify-between items-center box py-6"
              onClick={this.close}
              onKeyDown={this.keydown}
              role="link"
              tabIndex={0}
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
              {smMenus.map((menu) => {
                return (
                  <Link
                    to={menu.url}
                    className="block text-white py-4 no-underline"
                  >
                    {menu.title}
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </header>
    );
  }
}

export default Header;
