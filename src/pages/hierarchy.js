import React from 'react';
import Head from '../components/Head';
import Typography from '../components/Typography';

const Hierarchy = () => {
  const headings = [
    { name: 'Heading 1 (5xl)', class: 'text-5xl' },
    { name: 'Heading 2 (4xl)', class: 'text-4xl' },
    { name: 'Heading 3 (3xl)', class: 'text-3xl' },
    { name: 'Heading 4 (2xl)', class: 'text-2xl' },
    { name: 'Heading 5 (xl)', class: 'text-xl' },
    { name: 'Heading 6 (base)', class: 'text-base' },
  ];

  return (
    <Typography>
      <Head title="Hierarchy" />
      <div className="my-4 md:my-8">
        {headings.map((heading) => (
          <p className={heading.class} key={heading.name}>
            {heading.name}
          </p>
        ))}
      </div>
    </Typography>
  );
};

export default Hierarchy;
