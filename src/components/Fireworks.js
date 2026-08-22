import { gsap } from "gsap";
import React, { useEffect, useRef } from "react";
import { Physics2DPlugin } from "gsap/Physics2DPlugin";

const COLORS = [
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

const Fireworks = ({ style }) => {
  const container = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(Physics2DPlugin);

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    if (!container.current) {
      return;
    }

    for (const flame of container.current.children) {
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
  }, []);

  const children = Array.from({ length: 50 }, (_, index) => (
    <div
      key={index}
      className="absolute w-1 h-1 rounded-full"
      style={{
        background: COLORS[Math.floor(Math.random() * COLORS.length)],
      }}
    />
  ));

  return (
    <div className="relative w-2 h-2" ref={container} style={{ ...style }}>
      {children}
    </div>
  );
};

export default Fireworks;
