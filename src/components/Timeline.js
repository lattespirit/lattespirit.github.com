import "./timeline.css";
import React, { Component } from "react";
import Events from "../content/events.json";
import Fireworks from "../components/Fireworks";

class Timeline extends Component {
  state = {};
  constructor() {
    super();
    const events = Events.map(event => {
      const datePattern = /^(\d{4})-(\d{2})-(\d{2})$/;
      const [, year, month, day] = datePattern.exec(event.date);
      return {
        ...event,
        year: year,
        month: month,
        day: day
      };
    });
    this.state = { events: events, selected: Events[0] };
  }

  select = hovered => {
    const events = this.state.events.map(event => {
      return { ...event, selected: event.date === hovered.date };
    });
    this.setState({ events: events, selected: hovered });
  };

  renderCarouselImage = () => {
    if (this.state.selected.date === "2012-07-25") {
      return this.imageOfFirstLaunch();
    }

    if (this.state.selected.date === "2014-01-28") {
      return this.imageOfMovingToGithub();
    }

    if (this.state.selected.date === "2019-12-29") {
      return this.assetsOfRefactoringUI();
    }

    return (
      <div className="flex justify-center items-center w-full h-full">
        <img
          className="w-60"
          src={this.state.selected.asset}
          alt="About"
          style={{ animation: "general 1s linear 0s infinite alternate both" }}
        />
      </div>
    );
  };

  imageOfFirstLaunch = () => {
    return (
      <div className="relative w-80">
        <img
          className="absolute bottom-0 rounded object-contain"
          src={this.state.selected.asset}
          alt="About - Launch"
          style={{ animation: "v1 2s linear 1s infinite alternate both" }}
        />
        <div>
          <Fireworks />
        </div>
      </div>
    );
  };

  imageOfMovingToGithub = () => {
    return (
      <div className="relative w-80">
        <img
          className="absolute bottom-0 rounded"
          src="/images/about/v2.png"
          alt="About - Moving to Github Pages"
          style={{ animation: "v1 2s linear 1s infinite alternate both" }}
        />
      </div>
    );
  };

  assetsOfRefactoringUI = () => {
    return (
      <div className="flex flex-col relative w-50 red">
        <Fireworks />
        <img
          className="absolute bottom-0 rounded"
          src="/images/about/v3-typography.png"
          alt="About v3 Typography"
          style={{
            animation: "typography 2s linear 0s infinite alternate both"
          }}
        />
        <img
          className="absolute right-0 bottom-0 rounded"
          src="/images/about/v3-figma.png"
          alt="About v3 Figma"
          style={{ animation: "figma 2s linear 0s infinite alternate both" }}
        />
        <Fireworks style={{ transform: "translate(300px)" }} />
      </div>
    );
  };

  render() {
    return (
      <div className="w-76 md:w-100 lg:w-240 mx-auto x:w-auto md:mx-auto x:mx-6 my-16">
        <div className="lg:w-200 mx-auto">
          <p className="text-white text-center text-xl lg:text-3xl font-bold">
            这些年
          </p>
          <div className="hidden lg:flex justify-between items-center mt-16">
            <div className="flex flex-col w-80">
              <p className="text-white text-left text-3xl font-bold">
                {this.state.selected.date}
              </p>
              <div className="w-full flex-grow bg-gray-lighter lg:bg-transparent opacity-85 rounded-lg text-gray-darkest lg:text-white text-sm lg:text-base px-4 py-2 lg:p-0 lg:mt-4">
                <p
                  className="text-left font-bold"
                  dangerouslySetInnerHTML={{
                    __html: this.state.selected.content
                  }}
                />
              </div>
            </div>
            <div className="flex w-100 h-80">{this.renderCarouselImage()}</div>
          </div>
        </div>

        <div className="lg:flex lg:justify-between mt-8 text-white">
          {this.state.events.map(event => {
            return (
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
                    className="w-full flex-grow bg-gray-lighter opacity-85 rounded-lg text-xs text-left text-gray-darkest px-4 py-2"
                    dangerouslySetInnerHTML={{ __html: event.content }}
                  />
                </div>
                <div
                  className={
                    event.selected
                      ? "hidden lg:flex flex-col justify-center items-center w-32 py-4 rounded-lg cursor-default font-bold text-purple-light bg-gray-light"
                      : "hidden lg:flex flex-col justify-center items-center w-32 py-4 rounded-lg cursor-default font-bold text-white bg-purple-light"
                  }
                >
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
            );
          })}
        </div>
      </div>
    );
  }
}

export default Timeline;
