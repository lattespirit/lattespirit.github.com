import { gsap } from "gsap";
import React, { Component } from "react";
import { Physics2DPlugin } from "gsap/Physics2DPlugin";

class Fireworks extends Component {
  constructor(props) {
    super(props);
    gsap.registerPlugin(Physics2DPlugin);
    this.container = React.createRef();
    this.colors = [
      "bg-red-100",
      "bg-red-200",
      "bg-red-300",
      "bg-red-400",
      "bg-red-500",
      "bg-red-600",
      "bg-red-700",
      "bg-red-800",
      "bg-orange-100",
      "bg-orange-200",
      "bg-orange-300",
      "bg-orange-400",
      "bg-orange-500",
      "bg-orange-600",
      "bg-orange-700",
      "bg-orange-800",
      "bg-yellow-100",
      "bg-yellow-200",
      "bg-yellow-300",
      "bg-yellow-400",
      "bg-yellow-500",
      "bg-yellow-600",
      "bg-yellow-700",
      "bg-yellow-800",
      "bg-green-100",
      "bg-green-200",
      "bg-green-300",
      "bg-green-400",
      "bg-green-500",
      "bg-green-600",
      "bg-green-700",
      "bg-green-800",
      "bg-purple-100",
      "bg-purple-200",
      "bg-purple-300",
      "bg-purple-400",
      "bg-purple-500",
      "bg-purple-600",
      "bg-purple-700",
      "bg-purple-800",
      "bg-pink-100",
      "bg-pink-200",
      "bg-pink-300",
      "bg-pink-400",
      "bg-pink-500",
      "bg-pink-600",
      "bg-pink-700",
      "bg-pink-800"
    ];
  }

  componentDidMount() {
    for (let flame of this.container.current.children) {
      gsap.to(flame, {
        duration: 1.5,
        repeat: -1,
        physics2D: {
          velocity: Math.random() * 100 + 50,
          angle: Math.floor(Math.random() * 360),
          gravity: 300
        },
        opacity: 0
      });
    }
  }

  render() {
    const children = [];
    for (var i = 0; i < 50; i++) {
      children.push(
        React.createElement("div", {
          className:
            "w-1 h-1 rounded-full absolute " +
            this.colors[Math.floor(Math.random() * this.colors.length)],
          key: i
        })
      );
    }
    return (
      <div
        className="relative w-2 h-2"
        ref={this.container}
        style={{ ...this.props.style }}
      >
        {children}
      </div>
    );
  }
}

export default Fireworks;
