import React from "react";

const IconCross = ({ size = 24, color = "#0E121B", ...props }) => (
  <svg width={size} height={size} fill="none" viewBox="0 0 24 24" {...props}>
    <path
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
      d="m6 6 12 12M18 6 6 18"
    />
  </svg>
);

export default IconCross;
