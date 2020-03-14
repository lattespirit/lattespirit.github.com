import React from "react";
import { graphql, Link } from "gatsby";
import Layout from "../components/layout";
import Disqus from "../components/disqus";

export default ({ data, pageContext }) => {
  const post = data.markdownRemark;
  const { prev, next } = pageContext;
  return (
    <Layout>
      <div>
        <h1>{post.frontmatter.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: post.html }} />
      </div>

      {prev && <Link to={prev.fields.slug}>Previous</Link>}
      {next && <Link to={next.fields.slug}>Next</Link>}

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
