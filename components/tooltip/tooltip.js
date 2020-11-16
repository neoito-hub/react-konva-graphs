import React from 'react';
import { Rect, Text, Group } from "react-konva";

const ToolTip = ({
  position
}) => {
  const {
    x,
    y
  } = position;
  return /*#__PURE__*/React.createElement(Group, {
    x: x,
    y: y
  }, /*#__PURE__*/React.createElement(Rect, {
    width: 120,
    height: 50,
    fill: "rgba(0,0,0,0.9)",
    cornerRadius: 8
  }), /*#__PURE__*/React.createElement(Text, {
    fill: "#fff",
    text: "June",
    fontStyle: "bold",
    x: 10,
    y: 8
  }), /*#__PURE__*/React.createElement(Text, {
    fill: "#fff",
    text: "Data 26",
    x: 10,
    y: 24
  }));
};

export default ToolTip;