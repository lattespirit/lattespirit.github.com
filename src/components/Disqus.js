import React, { Suspense, useState, useEffect } from 'react';
import { InformationCircleIcon } from '@heroicons/react/24/solid';

const DiscussionEmbed = React.lazy(() =>
  import('disqus-react').then((module) => ({ default: module.DiscussionEmbed }))
);

const Disqus = ({ disqus }) => {
  const [loaded, setLoaded] = useState(false);
  const [message, setMessage] = useState('Disqus 评论框加载中。。。');
  const [shouldRender, setShouldRender] = useState(false);

  const config = {
    shortname: process.env.GATSBY_DISQUS_NAME,
    config: {
      url: `${process.env.SITE_URL}/${disqus.slug}`,
      identifier: disqus.slug,
      title: disqus.title,
    },
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setShouldRender(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (shouldRender) {
      fetch('https://disqus.com/next/config.json')
        .then((response) => setLoaded(response.status === 200))
        .catch(() => setMessage('朋友，加载 Disqus 评论框就差那一步了 :)'));
    }
  }, [shouldRender]);

  if (!shouldRender) {
    return null;
  }

  return (
    <div className="box mt-20 p-4 md:p-6 bg-gray-lighter opacity-85 rounded-lg">
      {loaded ? (
        <Suspense
          fallback={
            <div className="text-center text-purple-light font-bold">
              {message}
            </div>
          }
        >
          <DiscussionEmbed {...config} />
        </Suspense>
      ) : (
        <div className="flex justify-center items-center gap-2 border-purple-light text-purple-light text-xs md:text-base text-center rounded-sm">
          <InformationCircleIcon className="size-6" />
          <span className="text-purple-light font-bold">{message}</span>
        </div>
      )}
    </div>
  );
};

export default Disqus;
