import React from "react";
import { Link } from "gatsby";

export default ({ children }) => {
  const menus = [
    {
      name: "Logos",
      path: "/logos"
    },
    {
      name: "Colors",
      path: "/colors"
    },
    {
      name: "Typeface",
      path: "/typeface"
    },
    {
      name: "Hierachy",
      path: "/hierachy"
    }
  ];
  return (
    <React.Fragment>
      <div className="px-4 py-4 md:px-8">
        <Link
          to="/"
          className="text-2xl md:text-3xl font-semibold text-black no-underline"
        >
          Lattespirit
        </Link>
      </div>
      <div className="md:flex px-4 md:px-0">
        <div className="flex justify-between md:block md:w-20 my-4">
          {menus.map(menu => {
            const classes =
              window.location.pathname === menu.path
                ? "md:py-8 md:border-b-0 md:border-l-2 md:text-lg typography-nav"
                : "md:py-8 md:border-b-0 md:border-l-2 md:text-lg";
            return (
              <div className={classes} key={menu.path}>
                <Link
                  className="md:px-8 text-black no-underline"
                  to={menu.path}
                >
                  {menu.name}
                </Link>
              </div>
            );
          })}
        </div>
        <div className="w-72 x:w-80 md:w-200 mx-auto md:mx-12 md:px-12 lg:px-20">
          {children}
        </div>
      </div>
    </React.Fragment>
  );
};
