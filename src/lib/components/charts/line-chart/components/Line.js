import React, { useState } from 'react';
import { Line, Circle } from 'react-konva';
// import { nanoid } from 'nanoid';

import ToolTip from '../../../tooltip/tooltip';

const ChartLine = ({ data, x, y, points, backgroundColor }) => {
  const [hover, setHover] = useState({
    didHover: false,
    position: null,
    data: null,
  });

  const onMouseOver = (e, idx, label) => {
    setHover({
      didHover: true,
      data: {
        x: x,
        y: y-50,
        name: data.label,
        value: data.value,
      },
    });
  };

  const onMouseOut = (e) => {
    setHover({
      didHover: false,
      data: null,
    });
  };
  return (
    <>
      <Circle 
        x={x}
        y={y}
        radius={4}
        fill= {backgroundColor}
        onMouseOver={(e) => onMouseOver(e)}
        onMouseOut={onMouseOut}
      />
      <Line 
        points={points}
        stroke= '#D98880 '
        strokeWidth= {2}
        lineCap= 'round'
        lineJoin= 'round'
        dash={[10,5]}
      />
      {hover.didHover && <ToolTip data={hover.data} />}
    </>
  );
};

export default ChartLine;
