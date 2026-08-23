import React from 'react';
import { Link } from 'gatsby';
import { useLocation } from '@reach/router';

const Typography = ({ children }) => {
  const { pathname } = useLocation();

  const menus = [
    {
      name: 'Logos',
      path: '/logos',
    },
    {
      name: 'Colors',
      path: '/colors',
    },
    {
      name: 'Typeface',
      path: '/typeface',
    },
    {
      name: 'Hierarchy',
      path: '/hierarchy',
    },
  ];

  const isActive = (path) => {
    const current = pathname.replace(/\/+$/, '') || '/';
    const target = path.replace(/\/+$/, '') || '/';
    return current === target;
  };

  return (
    <>
      <div className="md:flex md:justify-center md:gap-10 px-4 md:px-0">
        <nav
          className="flex justify-between md:block md:w-20 my-4 md:my-0"
          aria-label="Typography pages"
        >
          {menus.map((menu) => {
            const active = isActive(menu.path);
            return (
              <Link
                className={`md:block md:py-8 md:px-8 md:text-lg text-white no-underline hover:text-sunset-light transition-colors duration-200 ${
                  active ? 'typography-nav' : ''
                }`}
                to={menu.path}
                key={menu.path}
                aria-current={active ? 'page' : undefined}
              >
                {menu.name}
              </Link>
            );
          })}
        </nav>
        <div className="w-72 x:w-80 md:w-200 mx-auto md:mx-0 md:px-12 lg:px-20">
          {children}
        </div>
      </div>
    </>
  );
};

export default Typography;
