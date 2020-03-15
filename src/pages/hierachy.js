import React from "react";
import Typography from "../components/Typography";

export default () => {
  const headings = [
    { name: "Heading 9 (xs)", class: "text-xs" },
    { name: "Heading 8 (sm)", class: "text-sm" },
    { name: "Heading 7 (base)", class: "text-base" },
    { name: "Heading 6 (xl)", class: "text-xl" },
    { name: "Heading 5 (2xl)", class: "text-2xl" },
    { name: "Heading 4 (3xl)", class: "text-3xl" },
    { name: "Heading 3 (4xl)", class: "text-4xl" },
    { name: "Heading 2 (5xl)", class: "text-5xl" },
    { name: "Heading 1 (6xl)", class: "text-6xl" }
  ];

  return (
    <Typography>
      <div className="my-4 md:my-8">
        {headings.map(heading => {
          return (
            <p className={heading.class} key={heading.name}>
              {heading.name}
            </p>
          );
        })}
      </div>
    </Typography>
  );
};
