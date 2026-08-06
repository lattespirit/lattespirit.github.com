import React from "react";
import { MotionConfig as MotionConfigFramer } from "framer-motion";
import { MotionConfig as MotionConfigMotion } from "motion/react";

const ReducedMotion = ({ children }) => (
  <MotionConfigFramer reducedMotion="user">
    <MotionConfigMotion reducedMotion="user">{children}</MotionConfigMotion>
  </MotionConfigFramer>
);

export default ReducedMotion;
