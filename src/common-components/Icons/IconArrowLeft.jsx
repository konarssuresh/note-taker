import React from "react";

const IconArrowLeft = ({ size = 24, color = "#000", ...props }) => (
  <svg width={size} height={size} fill="none" viewBox="0 0 24 24" {...props}>
    <path
      fill={color}
      fillRule="evenodd"
      d="M15.75 20.414 7.336 12l8.414-8.414L17.164 5l-7 7 7 7-1.414 1.414Z"
      clipRule="evenodd"
    />
  </svg>
);

export default IconArrowLeft;
