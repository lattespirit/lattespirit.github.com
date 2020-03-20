import React, { Component } from "react";
import { DiscussionEmbed } from "disqus-react";
import axios from "axios";

class Disqus extends Component {
  state = {};

  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      message: "Disqus 评论框加载中。。。",
      config: {
        shortname: process.env.GATSBY_DISQUS_NAME,
        config: {
          identifier: props.disqus.slug,
          title: props.disqus.title
        }
      }
    };
  }

  componentDidMount() {
    axios
      .get("https://disqus.com/next/config.json")
      .then(response => this.setState({ loaded: response.status === 200 }))
      .catch(() =>
        this.setState({ message: "朋友，加载 Disqus 评论框就差那一步了 :)" })
      );
  }

  renderDisqus = () => {
    return <DiscussionEmbed {...this.state.config} />;
  };

  renderMessage = () => {
    return (
      <p
        className="flex justify-center items-center border-purple-light text-purple-light text-xs md:text-base text-center rounded"
        v-if="! loaded"
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-4 h-4 sm:w-6 sm:h-6 mx-2 sm:mx-4 feather feather-info"
        >
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="16" x2="12" y2="12" />
          <line x1="12" y1="8" x2="12.01" y2="8" />
        </svg>
        <span className="text-purple-light font-bold">
          {this.state.message}
        </span>
      </p>
    );
  };

  render() {
    return (
      <div className="box mt-20 p-4 md:p-6 bg-gray-lighter opacity-85 rounded-lg">
        {this.state.loaded ? this.renderDisqus() : this.renderMessage()}
      </div>
    );
  }
}

export default Disqus;
