import React from "react";
import { Text } from "react-konva";

const BarChart = ({
  data,
  width,
  height,
  options
}) => {
  return /*#__PURE__*/React.createElement(Text, {
    text: data.heading
  });
};

export default BarChart;