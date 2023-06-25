import React from "react";
import "../App.css";
const CircularIconsWithText = () => {
  const position: any = "top";

  const getPositionClass = () => {
    switch (position) {
      case "top":
        return "top";
      case "right":
        return "right";
      case "bottom":
        return "bottom";
      case "left":
        return "left";
      default:
        return "";
    }
  };

  return (
    <div>
      <div
        style={{
          height: "50px",
          width: "50px",
          position: "relative",
          border: "2px solid #0468cc",
          borderRadius: "50%",
          padding: "12px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        icon
        <div style={{ position: "absolute", left: "-20px" }}>Top</div>
      </div>
    </div>
  );
};

export default CircularIconsWithText;
