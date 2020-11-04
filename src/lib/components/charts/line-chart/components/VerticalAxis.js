import React, { Fragment } from 'react';
import { nanoid } from 'nanoid';
import { Line, Text, Group } from 'react-konva';

const VerticalAxis = ({
  yAxisTicks,
  width,
  showGrid,
  height,
  yMargin,
  negativeTicks,
  yAxisInt,
  scaleFactor,
  scaleSuffix,
  xMargin,
}) => {
  const id = nanoid();

  let axisLines = [];
  let verticalIndex = -negativeTicks;
  let verticalInterval = (height - 2 * yMargin) / yAxisTicks;
  for (let i = 0; i <= yAxisTicks; i++) {
    let y = height - yMargin - i * verticalInterval;
    let yLabel = (verticalIndex * yAxisInt) / scaleFactor;
    yLabel = yLabel.toString() + scaleSuffix;
    axisLines.push(
      <Fragment key={nanoid()}>
        <Line
          listening={false}
          key={nanoid()}
          points={[xMargin - 2, y, xMargin - 8, y]}
          strokeWidth={1}
          stroke="#000000"
        />
        {showGrid ? (
          <Line
            listening={false}
            key={nanoid()}
            points={[xMargin, y, width - xMargin, y]}
            strokeWidth={0.9}
            stroke="#c1c1c1"
          />
        ) : null}
        <Text text={yLabel} x={-15} y={y - 10} fill="#000" fontStyle="bold" />
      </Fragment>
    );
    verticalIndex++;
  }

  return (
    <Group key={nanoid()}>
      <Line
        listening={false}
        id={id}
        key={nanoid()}
        points={[xMargin, yMargin, xMargin, height - yMargin]}
        strokeWidth={1}
        stroke="#000000"
      />
      {axisLines}
    </Group>
  );
};

export default VerticalAxis;
