/* eslint-disable react/prop-types */
/* eslint-disable react/no-danger */
import "./timeline.css";
import React, { Component } from "react";
import { graphql, StaticQuery } from "gatsby";
import Fireworks from "./Fireworks";
import NewTag from "./NewTag";

class Timeline extends Component {
  constructor(props) {
    super(props);
    const { edges } = props.data.allEventsJson;
    const events = edges.map((node) => {
      const { node: event } = node;
      const datePattern = /^(\d{4})-(\d{2})-(\d{2})$/;
      const [, year, month, day] = datePattern.exec(event.date);
      return {
        ...event,
        year,
        month,
        day,
        isNew: Date.now() - new Date(event.date) < 24 * 3600 * 30 * 1000,
      };
    });
    this.v1 = props.data.v1;
    this.v2 = props.data.v2;
    this.disqus = props.data.disqus;
    this.bootstrap = props.data.bootstrap;
    this.typography = props.data.typography;
    this.figma = props.data.figma;
    this.gatsby = props.data.gatsby;
    this.state = { events, selected: events[0] };
  }

  select = (hovered) => {
    const { events } = this.state;

    const filteredEvents = events.map((event) => ({
      ...event,
      selected: event.date === hovered.date,
    }));

    this.setState({ events: filteredEvents, selected: hovered });
  };

  renderCarouselImage = () => {
    const { selected } = this.state;

    if (selected.date === "2012-07-25") {
      return this.imageOfFirstLaunch();
    }

    if (selected.date === "2014-01-28") {
      return this.imageOfMovingToGithub();
    }

    if (selected.date === "2019-12-29") {
      return this.assetsOfRefactoringUI();
    }

    return (
      <div className="flex justify-center items-center w-full h-full">
        <img
          className="w-60"
          src={selected.image.path.publicURL}
          alt="About"
          style={{ animation: "general 1s linear 0s infinite alternate both" }}
        />
      </div>
    );
  };

  imageOfFirstLaunch = () => (
    <div className="relative w-80">
      <img
        className="absolute bottom-0 rounded-sm object-contain"
        src={this.v1.publicURL}
        alt="About - Launch"
        style={{ animation: "v1 2s linear 1s infinite alternate both" }}
      />
      <div>
        <Fireworks />
      </div>
    </div>
  );

  imageOfMovingToGithub = () => (
    <div className="relative w-80">
      <img
        className="absolute bottom-0 rounded-sm"
        src={this.v2.publicURL}
        alt="About - Moving to GitHub Pages"
        style={{ animation: "v1 2s linear 1s infinite alternate both" }}
      />
    </div>
  );

  assetsOfRefactoringUI = () => (
    <div className="flex flex-col relative w-50 red">
      <Fireworks />
      <img
        className="absolute bottom-0 rounded-sm"
        src={this.typography.publicURL}
        alt="About v3 Typography"
        style={{
          animation: "typography 2s linear 0s infinite alternate both",
        }}
      />
      <img
        className="absolute right-0 bottom-0 rounded-sm"
        src={this.figma.publicURL}
        alt="About v3 Figma"
        style={{ animation: "figma 2s linear 0s infinite alternate both" }}
      />
      <Fireworks style={{ transform: "translate(300px)" }} />
    </div>
  );

  render() {
    const { selected, events } = this.state;
    return (
      <div className="w-76 md:w-100 lg:w-240 mx-auto x:w-auto md:mx-auto x:mx-6 my-16">
        <div className="lg:w-200 mx-auto">
          <p className="text-white text-center text-xl lg:text-3xl font-bold">
            这些年
          </p>
          <div className="hidden lg:flex justify-between items-center mt-16">
            <div className="flex flex-col w-80">
              <p className="text-white text-left text-3xl font-bold">
                {selected.date}
              </p>
              <div className="w-full grow bg-gray-lighter lg:bg-transparent opacity-85 rounded-lg text-gray-darkest lg:text-white text-sm lg:text-base px-4 py-2 lg:p-0 lg:mt-4">
                <p
                  className="text-left font-bold"
                  dangerouslySetInnerHTML={{
                    __html: selected.content,
                  }}
                />
              </div>
            </div>
            <div className="flex w-100 h-80">{this.renderCarouselImage()}</div>
          </div>
        </div>

        <div className="lg:flex lg:justify-between mt-8 text-white">
          {events.map((event) => (
            <div
              className="flex mt-4 lg:mt-0"
              key={event.date}
              onMouseEnter={() => this.select(event)}
              role="link"
              tabIndex={0}
            >
              <div className="lg:hidden flex w-full">
                <span className="w-28 text-white text-xs text-left x:mr-4">
                  {event.date}
                </span>
                <div
                  className="w-full grow bg-gray-lighter opacity-85 rounded-lg text-xs text-left text-gray-darkest px-4 py-2"
                  dangerouslySetInnerHTML={{ __html: event.content }}
                />
              </div>
              <div
                className={`hidden transition-transform duration-500 transform hover:scale-115 relative lg:flex flex-col justify-center items-center w-32 py-4 rounded-lg cursor-default font-bold ${
                  event.selected
                    ? "text-purple-light bg-gray-light"
                    : "text-white bg-purple-light"
                }`}
              >
                {event.isNew && (
                  <NewTag className="absolute px-1 top-0 right-0 mt-2 mr-2 text-xs" />
                )}
                <span
                  className={
                    event.selected
                      ? "block text-purple-light text-5xl"
                      : "block text-white text-5xl"
                  }
                >
                  {event.day}
                </span>
                <span
                  className={
                    event.selected
                      ? "block text-purple-light text-lg"
                      : "block text-white text-lg"
                  }
                >
                  {event.year}-{event.month}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default () => (
  <StaticQuery
    query={graphql`
      query EventsQuery {
        allEventsJson {
          edges {
            node {
              content
              date
              selected
              image {
                path {
                  publicURL
                }
              }
            }
          }
        }
        v1: file(relativePath: { eq: "about/v1.png" }) {
          publicURL
        }
        v2: file(relativePath: { eq: "about/v2.png" }) {
          publicURL
        }
        disqus: file(relativePath: { eq: "about/disqus.png" }) {
          publicURL
        }
        bootstrap: file(relativePath: { eq: "about/bootstrap.svg" }) {
          publicURL
        }
        typography: file(relativePath: { eq: "about/v3-typography.png" }) {
          publicURL
        }
        figma: file(relativePath: { eq: "about/v3-figma.png" }) {
          publicURL
        }
        gatsby: file(relativePath: { eq: "about/gatsby.svg" }) {
          publicURL
        }
      }
    `}
    render={(data) => <Timeline data={data} />}
  />
);
