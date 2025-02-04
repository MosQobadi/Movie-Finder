import React, { useState } from "react";

const TextExpender = ({
  children,
  maxTextLength = 10,
  className = "",
  expandButtonText,
  collapseButtonText,
  expandButtonColor,
  collapseButtonColor,
}) => {
  const [maxText, setMaxText] = useState(maxTextLength);

  const expandText = (text) => {
    console.log(text);
  };

  return (
    <div className={className}>
      <p>{children}</p>
      <button
        style={{ color: expandButtonColor }}
        onClick={() => expandText(children.split(" ").length)}
      >
        {expandButtonText}
      </button>
      <button style={{ color: collapseButtonColor }}>
        {collapseButtonText}
      </button>
    </div>
  );
};

export default TextExpender;
