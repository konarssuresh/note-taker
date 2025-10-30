import React from "react";

const IconChevronRight = ({ size = 24, color = "#000", ...props }) => (
  <svg width={size} height={size} fill="none" viewBox="0 0 24 24" {...props}>
    <path
      fill={color}
      fillRule="evenodd"
      d="M9.47 7.47a.75.75 0 0 1 1.06 0l4 4a.75.75 0 0 1 0 1.06l-4 4a.75.75 0 1 1-1.06-1.06L12.94 12 9.47 8.53a.75.75 0 0 1 0-1.06Z"
      clipRule="evenodd"
    />
  </svg>
);

export default IconChevronRight;
