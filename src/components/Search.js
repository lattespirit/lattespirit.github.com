/* eslint-disable react/prop-types */
import Fuse from 'fuse.js';
import React, { Component } from 'react';
import { graphql, StaticQuery } from 'gatsby';

class Search extends Component {
  static emptyResult() {
    return (
      <div className="rounded-lg my-6 text-sm sm:text-base text-center">
        <p>
          匆匆的
          <span className="font-bold text-purple-dark">搜索结果</span>
          转眼已消逝
        </p>
        <p className="mt-4">有几多青春美丽</p>
      </div>
    );
  }

  constructor(props) {
    super(props);
    this.state = {
      originPosts: props.data.allMdx.posts.map((post) => {
        return {
          title: post.frontmatter.title,
          url: `${props.data.site.siteMetadata.url}/${post.fields.slug}`,
          content: post.excerpt,
          date: post.fields.date,
        };
      }),
      renderedPosts: [],
      opened: false,
      keyword: '',
    };
  }

  componentDidMount() {
    document.addEventListener('keyup', this.handleKeyboard);
  }

  componentWillUnmount() {
    document.removeEventListener('keyup', this.handleKeyboard);
  }

  handleKeyboard = (e) => {
    if (e.key === 'Esc' || e.key === 'Escape') {
      this.close();
    }

    if (e.key === 's') {
      this.open();
    }
  };

  clearKeyword = () => {
    this.setState({ keyword: '' });
  };

  open = () => {
    this.setState({ opened: true });
    document.querySelector('#search-input').focus();
  };

  close = () => {
    this.setState({ opened: false });
  };

  refreshRenderedPosts() {
    const options = {
      shouldSort: true,
      threshold: 0.6,
      location: 0,
      distance: 1000,
      maxPatternLength: 32,
      minMatchCharLength: 1,
      keys: ['title', 'content', 'url'],
    };

    const { originPosts } = this.state;

    const fusePosts = new Fuse(originPosts, options).search(this.keyword());

    this.setState({
      renderedPosts: fusePosts.map((post) => {
        const { item } = post;
        return {
          title: item.title,
          url: item.url,
          content: item.content,
          date: item.date,
          index: post.refIndex,
        };
      }),
    });
  }

  keyword() {
    const { keyword } = this.state;

    return keyword;
  }

  updateKeyword(e) {
    this.setState({ keyword: e.target.value }, () => {
      this.refreshRenderedPosts();
    });
  }

  result() {
    const { renderedPosts } = this.state;

    return renderedPosts.length === 0
      ? Search.emptyResult()
      : this.searchResult();
  }

  searchResult() {
    const { renderedPosts } = this.state;

    return renderedPosts.map((post) => {
      return (
        <div
          className="flex justify-between items-center mx-2 sm:mx-4 my-2 py-2 border-b last:border-b-0 border-gray-light"
          key={post.title}
        >
          <div className="w-40 sm:w-auto">
            <a
              className="block text-sm sm:text-base text-left font-bold no-underline"
              href={post.url}
            >
              {post.title}
            </a>
          </div>

          <div>
            <p className="text-xs">{post.date}</p>
          </div>
        </div>
      );
    });
  }

  renderResultPanel() {
    const { keyword } = this.state;

    if (keyword.length > 0) {
      return (
        <div
          className="w-full bg-white rounded-lg mt-4 sm:mt-8 px-4 overflow-y-scroll"
          style={{ maxHeight: '60vh' }}
        >
          {this.result()}

          <hr className="mt-8 text-purple-dark" />
          <p className="my-4 text-sm text-center">
            Search by{' '}
            <a
              className="text-purple-dark font-bold"
              href="https://fusejs.io"
              target="_blank"
              rel="noopener noreferrer"
            >
              @fuse.js
            </a>
          </p>
        </div>
      );
    }

    return <></>;
  }

  render() {
    const { opened, keyword } = this.state;
    return (
      <div
        className={opened ? 'fixed w-full h-full' : 'hidden'}
        style={{ top: '0vh' }}
      >
        <div className="relative mt-6 sm:mt-8 lg:mt-20">
          <div className="absolute box inset-x-0 z-10">
            <div className="flex items-center">
              <input
                type="text"
                name="keyword"
                className="w-full px-4 py-1 sm:py-2 text-sm sm:text-base rounded-full outline-none mr-2"
                placeholder="Search..."
                value={keyword}
                onChange={this.updateKeyword.bind(this)}
                id="search-input"
              />

              <svg
                viewBox="0 0 24 24"
                fill="none"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-6 h-6 sm:w-8 sm:h-8 stroke-current text-white feather feather-x-circle"
                onClick={this.close}
              >
                <circle cx="12" cy="12" r="10" />
                <line x1="15" y1="9" x2="9" y2="15" />
                <line x1="9" y1="9" x2="15" y2="15" />
              </svg>
            </div>

            {this.renderResultPanel()}
          </div>
        </div>
        <button
          className="fixed inset-0 w-full h-full bg-black opacity-50 outline-none cursor-default"
          onClick={this.close}
          type="reset"
          aria-label="Reset"
        />
      </div>
    );
  }
}

export default () => (
  <StaticQuery
    query={graphql`
      query sitePosts {
        allMdx(sort: { fields: fields___date, order: DESC }) {
          posts: nodes {
            excerpt(pruneLength: 10000)
            frontmatter {
              title
            }
            fields {
              slug
              date
            }
          }
        }
        site {
          siteMetadata {
            url
          }
        }
      }
    `}
    render={(data) => {
      return <Search data={data} />;
    }}
  />
);
