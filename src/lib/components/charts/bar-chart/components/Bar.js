import React, { useState } from 'react';
import { Rect, Group } from 'react-konva';
import { nanoid } from 'nanoid';

import ToolTip from '../../../tooltip/tooltip';

const Bar = ({ data, bw, bh, x, y, hoverBorderColor, borderWidth, backgroundColor }) => {
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
        y: 0,
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
      <Rect
        id={nanoid()}
        width={bw}
        height={bh}
        x={x}
        y={y}
        fill={backgroundColor}
        stroke={hover.didHover ? hoverBorderColor : null}
        onMouseOver={(e) => onMouseOver(e)}
        onMouseOut={onMouseOut}
      />
      {hover.didHover && <ToolTip data={hover.data} />}
    </>
  );
};

export default Bar;
