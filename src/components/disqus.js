import React from "react";
import { DiscussionEmbed } from "disqus-react";

export default ({ disqus }) => {
  const disqusConfig = {
    shortname: process.env.GATSBY_DISQUS_NAME,
    config: { identifier: disqus.slug, title: disqus.title }
  };
  return <DiscussionEmbed {...disqusConfig} />;
};
