/* eslint-disable react/prop-types */
import { gsap } from "gsap";
import React, { Component } from "react";
import { Physics2DPlugin } from "gsap/Physics2DPlugin";

class Fireworks extends Component {
  constructor(props) {
    super(props);
    gsap.registerPlugin(Physics2DPlugin);
    this.container = React.createRef();
    this.colors = [
      "#1fb6ff",
      "#7e5bef",
      "#ff49db",
      "#ff7849",
      "#13ce66",
      "#ffc82c",
      "#273444",
      "#8492a6",
      "#d3dce6",
    ];
  }

  componentDidMount() {
    for (const flame of this.container.current.children) {
      gsap.to(flame, {
        duration: 1.5,
        repeat: -1,
        physics2D: {
          velocity: Math.random() * 100 + 50,
          angle: Math.floor(Math.random() * 360),
          gravity: 300,
        },
        opacity: 0,
      });
    }
  }

  render() {
    const children = [];
    const { style } = this.props;

    for (let i = 0; i < 50; i += 1) {
      const color = this.colors[Math.floor(Math.random() * this.colors.length)];
      children.push(
        React.createElement("div", {
          className: "absolute w-1 h-1 rounded-full",
          key: i,
          style: { background: color },
        }),
      );
    }
    return (
      <div
        className="relative w-2 h-2"
        ref={this.container}
        style={{ ...style }}
      >
        {children}
      </div>
    );
  }
}

export default Fireworks;
