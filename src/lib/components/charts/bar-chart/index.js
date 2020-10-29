import React from 'react';
import { Text, Line, Rect, Group } from 'react-konva';
import { nanoid } from 'nanoid';
import Konva from 'konva';

import VerticalLines from './components/VerticalLines';
import HorizontalLines from './components/HorizontalLines';
import Bar from './components/Bar';

const BarChart = ({ data, width, height, options }) => {
  /*---------------------State------------------------------------------------------------------------------------------------*/

  const [toolTipData, setToolTipData] = React.useState({
    x: null,
    y: null,
    dataPlotted: null,
    label: null,
  });
  const [showToolTip, setShowToolTip] = React.useState(false);
  // const [labels, setLabels] = React.useState(data.labels);
  // const [dataToPlot, setDataToPlot] = React.useState(data.datasets.data)

  /*---------------------------------------------------------------------------------------------------------------------*/

  /*---------------------refs------------------------------------------------------------------------------------------------*/

  const groupRef = React.useRef();

  /*------------------------------------------------------------------------------------------------------------------------*/

  /*---------------------variables------------------------------------------------------------------------------------------------*/

  const showGrid = options.showGrid === undefined ? true : options.showGrid;
  const groupId = nanoid();
  const labels = data.labels;
  const dataToPlot = data.datasets.data;
  const barWidth = 0.7; // 70% of interval
  const minVal = Math.min(...dataToPlot);
  const maxVal = Math.max(...dataToPlot);
  let absoluteMax = maxVal;

  if (Math.abs(minVal) > maxVal) absoluteMax = Math.abs(minVal);
  let a = Math.ceil(absoluteMax / dataToPlot.length);
  let b = a.toString().length;

  if (b > 1) a = parseInt(a / Math.pow(10, b - 1)) * Math.pow(10, b - 1);
  let scaleFactor = 0;
  let scaleSuffix = '';
  const yAxisInt = a;
  const positiveTicks = Math.ceil(maxVal / a);
  const negativeTicks = Math.ceil(-minVal / a);
  const yAxisTicks = positiveTicks + negativeTicks;
  const labelLength = data.labels.length;
  const horizontalInterval = width / labelLength;
  const verticalInterval = height / yAxisTicks;
  const graphRange = yAxisTicks * yAxisInt;

  if (absoluteMax > 10000000) {
    scaleFactor = 1000000;
    scaleSuffix = 'M';
  } else if (absoluteMax > 10000) {
    scaleFactor = 1000;
    scaleSuffix = 'K';
  } else {
    scaleFactor = 1;
    scaleSuffix = '';
  }

  const getBarWidth = () => {
    return (horizontalInterval * (barWidth * 100)) / 100;
  };

  const getBarheight = (i) => {
    const barRatio = dataToPlot[i] / graphRange;
    return barRatio * height;
  };

  const getBarX = (i) => {
    return horizontalInterval * i + (horizontalInterval - getBarWidth()) / 2;
  };

  const getBarY = (i) => {
    const normalizer = Math.abs((-negativeTicks * yAxisInt) / scaleFactor);
    console.log(normalizer)
    const ht = (height - getBarheight(i)) -normalizer;
    return ht ;
  };

  /*---------------------------------------------------------------------------------------------------------------------*/

  /*-------------------------------------functions--------------------------------------------------------------------------------*/

  /*---------------------------------------------------------------------------------------------------------------------*/

  return (
    <>
      <Group x={60} y={60} id={groupId} ref={groupRef} draggable={true}>
        <Rect
          fill="#fff"
          width={width}
          height={height}
          onClick={() => setShowToolTip(false)}
        />
        <Text x={width / 2} y={-30} fontSize={20} text={data.datasets.label} />
        {/* horizontal lines */}
        <HorizontalLines
          yAxisTicks={yAxisTicks}
          width={width}
          showGrid={showGrid}
          height={height}
          negativeTicks={negativeTicks}
          verticalInterval={verticalInterval}
          scaleFactor={scaleFactor}
          scaleSuffix={scaleSuffix}
          yAxisInt={yAxisInt}
        />

        {/* vertical lines */}
        <VerticalLines
          yAxisTicks={yAxisTicks}
          width={width}
          showGrid={showGrid}
          height={height}
          horizontalInterval={horizontalInterval}
          labels={labels}
        />

        {/* bars */}

        {labels.map((label, i) => (
          <Bar
            key={nanoid()}
            data={{ label, value: dataToPlot[i] }}
            bw={getBarWidth()}
            bh={getBarheight(i)}
            x={getBarX(i)}
            y={getBarY(i)}
            hoverBorderColor={data.hoverBorderColor || '#000'}
            borderWidth={data.borderWidth || 2}
            backgroundColor={
              data?.datasets?.backgroundColor
                ? data.datasets.backgroundColor[i]
                  ? data.datasets.backgroundColor[i]
                  : Konva.Util.getRandomColor()
                : Konva.Util.getRandomColor()
            }
          />
        ))}
      </Group>
    </>
  );
};

export default BarChart;
