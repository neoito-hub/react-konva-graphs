import React, { Fragment } from 'react';
import { nanoid } from 'nanoid';
import { Line, Text, Group } from 'react-konva';

const HorizontalAxis = ({
  yAxisTicks,
  width,
  showGrid,
  height,
  negativeTicks,
  xMargin,
  yMargin,
  positiveTicks,
  labels,
  pitchInterval,
  horizontalInterval,
  barWidth,
  xAxisPos,
}) => {
  let xAxis = [];

  const getTextWidth = (text) => {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    const w = context.measureText(text).width;
    return w;
  };

  const xAxisLabelPlacementCalc = (x, i) => {
    const w = getTextWidth(labels[i]);
    // console.log(labels[i], width+"="+w+" bw="+horizontalInterval)
    if (w >= barWidth) {
      return x - horizontalInterval / 2;
    } else {
      return x - horizontalInterval / 2 + 5;
    }
  };

  for (let i = 0; i < labels.length; i++) {
    let x = xMargin - pitchInterval / 2 + (i + 1) * pitchInterval + 5;
    xAxis.push(
      <Fragment key={nanoid()}>
        <Line
          strokeWidth={1}
          stroke="#000000"
          points={[x - 5, xAxisPos, x - 5, xAxisPos + 3]}
        />
        <Text
          text={labels[i]}
          x={xAxisLabelPlacementCalc(x,i)}
          y={xAxisPos + 5}
          fill="#000"
          width={horizontalInterval - 5}
          // fontStyle="bold"
        />
      </Fragment>
    );
  }

  return (
    <>
      <Line
        strokeWidth={1}
        stroke="#000000"
        points={[xMargin, xAxisPos, width - xMargin, xAxisPos]}
      />
      {xAxis}
    </>
  );
};

export default HorizontalAxis;
