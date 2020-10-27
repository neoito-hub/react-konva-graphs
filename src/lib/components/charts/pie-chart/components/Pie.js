import React, { Fragment, useState } from "react";
import { Wedge, Text } from "react-konva";

const Pie = ({
  width,
  height,
  radius = 100,
  data,
  total,
  rotation,
  totalInput,
}) => {
  const [hover, setClick] = useState({ didHover: false });
  const onMouseOver = (e) => {
    console.log(e.target.getParent());
    setClick({
      didHover: true,
    });
  };
  const onMouseOut = (e) => {
    setClick({
      didHover: false,
    });
  };
  // console.log("e.target")

  return (
    <Fragment>
      <Wedge
        name={data.product}
        x={width / 4}
        y={height / 2}
        radius={radius}
        angle={(360 / total) * data.value}
        fill={data.color}
        stroke={hover.didHover ? data.strokeColor : null}
        strokeWidth={hover.didHover ? data.strokeWidth : null}
        rotation={rotation}
        onMouseOver={onMouseOver}
        onMouseOut={onMouseOut}
        onMouseDown={onMouseOut}
        scaleX={hover.didHover ? 1.1 : 1}
        scaleY={hover.didHover ? 1.1 : 1}
        shadowEnabled
        opacity={hover.didHover ? 0.8 : 1}
        shadowColor={hover.didHover ? "black" : "transparent"}
        shadowBlur={hover.didHover ? 10 : 0}
        shadowOpacity={hover.didHover ? 0.6 : 0}
        shadowOffsetX={hover.didHover ? 10 : 0}
        shadowOffsetY={hover.didHover ? 10 : 0}
      />
      {hover.didHover && (
        <Text
          text={Math.trunc((10000 / total) * data.value) / 100}
          x={-100}
          y={-50}
          strokeColor='black'
          fontSize={36}
          fontFamily='Arial'
        />
      )}
    </Fragment>
  );
};

export default Pie;
