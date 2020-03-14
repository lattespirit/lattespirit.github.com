import React from "react";
import { DiscussionEmbed } from "disqus-react";

export default ({ disqus }) => {
  const disqusConfig = {
    shortname: process.env.GATSBY_DISQUS_NAME,
    config: { identifier: disqus.slug, title: disqus.title }
  };
  return (
    <div className="box mt-20 p-4 md:p-6 bg-gray-lighter opacity-85 rounded-lg">
      <DiscussionEmbed {...disqusConfig} />
    </div>
  );
};
