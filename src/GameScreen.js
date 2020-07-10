import React, { useState } from "react";
import CircleArea from "./CircleArea";

const bgStyle = {
  // backgroundColor: '#d88282',
  width: "100%",
  height: "100%",
  position: "relative"
};

const headerStyle = {
  textAlign: "center",
  fontFamily: "Roboto, sans-serif",
  marginBottom: 10,
  paddingTop: 30,
  color: "#fff"
};

const GameScreen = () => {
  return (
    <div style={bgStyle} className="App">
      <h1 style={headerStyle}>Memory Circle Game</h1>
      <p style={{ color: "#fff", marginBottom: 15 }}>The goa</p>
      <CircleArea />
    </div>
  );
};

export default GameScreen;
