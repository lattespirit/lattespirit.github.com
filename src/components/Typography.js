import React from 'react';
import { Link } from 'gatsby';
import { globalHistory } from '@reach/router';

const Typography = ({ children }) => {
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
  return (
    <>
      <div className="md:flex md:justify-center md:gap-10 px-4 md:px-0">
        <div className="flex justify-between md:block md:w-20 my-4 md:my-0">
          {menus.map((menu) => {
            const classes = globalHistory.location.pathname === menu.path
              ? 'md:py-8 md:border-b-0 md:border-l-2 md:text-lg typography-nav'
              : 'md:py-8 md:border-b-0 md:border-l-2 md:text-lg';
            return (
              <div className={classes} key={menu.path}>
                <Link
                  className="md:px-8 text-white no-underline hover:text-sunset-light transition-colors duration-200"
                  to={menu.path}
                >
                  {menu.name}
                </Link>
              </div>
            );
          })}
        </div>
        <div className="w-72 x:w-80 md:w-200 mx-auto md:mx-0 md:px-12 lg:px-20">
          {children}
        </div>
      </div>
    </>
  );
};

export default Typography;
