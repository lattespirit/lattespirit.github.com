import React, { forwardRef, useImperativeHandle, useRef } from "react";
import { MorphIcon } from "morphicons/react";

// Heroicons 24 outline RSS. The pulse keeps the exact same glyph and only
// scales the two arcs (middle + right) radially about the dot by 1.22,
// so the icon stays RSS throughout.
const RSS_D =
  "M12.75 19.5v-.75a7.5 7.5 0 0 0-7.5-7.5H4.5m0-6.75h.75c7.87 0 14.25 6.38 14.25 14.25v.75M6 18.75a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z";
const RSS_EXPANDED_D =
  "M14.235 19.665v-0.915a9.15 9.15 0 0 0-9.15-9.15H4.17m0-8.235h0.915c9.601 0 17.385 7.784 17.385 17.385v0.915M6 18.75a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z";

// bouncy preset: k=300, damping=14 (ζ≈0.40) — visible spring overshoot
// on both the expand and the return.
const PULSE_SPRING = "bouncy";

const RssMorphIcon = forwardRef((props, ref) => {
  const morphRef = useRef(null);

  useImperativeHandle(ref, () => ({
    pulse: () => morphRef.current?.morphTo(RSS_EXPANDED_D, PULSE_SPRING),
    restore: () => morphRef.current?.morphTo(RSS_D, PULSE_SPRING),
  }));

  return (
    <MorphIcon
      ref={morphRef}
      icon={RSS_D}
      spring={PULSE_SPRING}
      reducedMotion="user"
      strokeWidth={1.5}
      {...props}
    />
  );
});

RssMorphIcon.displayName = "RssMorphIcon";

export default RssMorphIcon;
