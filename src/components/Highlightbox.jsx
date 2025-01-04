import React from "react";

const HighlightBox = ({ title, value, Icon }) => {
  return (
    <div
      style={{
        backgroundColor: "#2d3748",
        color: "white",
        padding: "1.5rem",
        borderRadius: "1rem",
        width: "220px",
        height: "120px", // Increased height for better spacing
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <div
        style={{
          fontSize: "18px",
          fontWeight: "bold",
          textAlign: "center",
          marginBottom: "0.5rem", // Added margin for spacing between title and value
        }}
      >
        {title}
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-evenly",
          width: "100%",
        }}
      >
        <Icon style={{ fontSize: "35px", color: "#38b2ac" }} />
        <p
          style={{
            fontSize: "32px",
            fontWeight: "600",
            margin: 0,
            textAlign: "center",
            marginLeft: "0.5rem", // Added margin for spacing between icon and value
          }}
        >
          {value}
        </p>
      </div>
    </div>
  );
};

export default HighlightBox;
