import React from "react";
import { graphql } from "gatsby";
import Layout from "../components/layout";
import Disqus from "../components/disqus";

export default ({ data }) => {
  const post = data.markdownRemark;
  return (
    <Layout>
      <div>
        <h1>{post.frontmatter.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: post.html }} />
      </div>
      <Disqus
        disqus={{ slug: post.fields.slug, title: post.frontmatter.title }}
      />
    </Layout>
  );
};

export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
      }
      fields {
        slug
        date
      }
    }
  }
`;
