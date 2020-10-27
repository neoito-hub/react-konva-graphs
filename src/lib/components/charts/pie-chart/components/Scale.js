import React, { Fragment } from "react";
import { Text, Rect } from "react-konva";

const Scale = ({ idx, width, height, radius, data, totalInput }) => {
  return (
    <Fragment>
      <Rect
        width={width / 13}
        height={height / 30}
        fill={data.color}
        x={width / 5}
        y={height - idx * (height / 2 / totalInput)}
        stroke='black'
        strokeWidth={1}
      />
      <Text
        text={data.product.slice(0, 1).toUpperCase() + data.product.slice(1)}
        x={width / 5 + width / 8}
        y={height - idx * (height / 2 / totalInput)}
        fontSize={radius / 7}
      />
    </Fragment>
  );
};

export default Scale;
