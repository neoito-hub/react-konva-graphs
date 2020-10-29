import React from 'react';
import { nanoid } from 'nanoid';
import { Line, Text, Group } from 'react-konva';

const HorizontalLines = ({
  yAxisTicks,
  yAxisInt,
  scaleSuffix,
  width,
  showGrid,
  height,
  verticalInterval,
  scaleFactor,
  negativeTicks,
}) => {
  let verticalIndex = -negativeTicks;
  return [...Array(yAxisTicks + 1)].map((item, i) => {
    const y = height - i * verticalInterval;
    const id = nanoid();
    let yLabel = (verticalIndex * yAxisInt) / scaleFactor;
    console.log();
    yLabel = yLabel.toString() + scaleSuffix;
    verticalIndex++;
    if (showGrid)
      return (
        <Group key={nanoid()}>
          <Line
            listening={false}
            id={id}
            key={id}
            points={[-5, y, 0, y, width, y]}
            strokeWidth={0.9}
            stroke="#c1c1c1"
          />
          <Text key={nanoid()} text={yLabel} y={y - 10} x={-40} fill="#000" />
        </Group>
      );
    return <Text key={nanoid()} text={yLabel} y={y - 10} x={-40} fill="#000" />;
  });
};

export default HorizontalLines;
