import React from 'react';
import { nanoid } from 'nanoid';
import { Line, Text, Group } from 'react-konva';

const VerticalLines = ({
  yAxisTicks,
  width,
  showGrid,
  height,
  horizontalInterval,
  labels,
}) => {
  return [...Array(yAxisTicks+2)].map((item, i) => {
    let x = width - i * horizontalInterval;
    x = width - x;
    const id = nanoid();
    if (showGrid)
      return (
        <Group key={nanoid()}>
          <Line
            listening={false}
            id={id}
            key={id}
            points={[x, 0, x, height, x]}
            strokeWidth={0.9}
            stroke="#c1c1c1"
          />
          <Text
            text={labels[i]}
            x={x+5}
            width={horizontalInterval-5}
            y={height + 5}
            fill="#000"
          />
        </Group>
      );
    return (
      <Text
        text={labels[i]}
        x={x - horizontalInterval}
        y={height + 5}
        fill="#000"
      />
    );
  });
};

export default VerticalLines;
