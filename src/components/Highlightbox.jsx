import React from "react";
import "../styles/Highlightbox.css";

const HighlightBox = ({ title, value, Icon }) => {
  return (
    <div className="highlight-box">
      <div className="highlight-title">{title}</div>
      <div className="highlight-content">
        <Icon className="highlight-icon" />
        <p className="highlight-value">{value}</p>
      </div>
    </div>
  );
};

export default HighlightBox;
