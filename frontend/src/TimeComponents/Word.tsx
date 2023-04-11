import React from "react";

export const Word = ({ value = "", hidden = false }) => {
  const visibility = hidden ? "hidden" : "visible";
  return (
    <div className="digital">
      <p>{value}</p>
      <p style={{ visibility }}>{value}</p>
    </div>
  );
};
