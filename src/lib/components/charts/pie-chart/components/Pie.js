import React, { Fragment, useState } from 'react'
import { Wedge } from 'react-konva'
import ToolTip from '../../../tooltip/tooltip'

const Pie = ({
  width,
  height,
  radius = 100,
  data,
  total,
  rotation,
  totalInput,
}) => {
  const [hover, setHover] = useState({
    didHover: false,
    position: null,
    data: null,
  })

  //* --------------------------------- Methods -------------------------------- */
  const onMouseOver = (e) => {
    console.log("mouseover")
    setHover({
      didHover: true,
      data: {
        x: width,
        y: 0,
        name: data.label,
        value: data.value,
      },
    })
  }

  const onMouseOut = (e) => {
    setHover({
      didHover: false,
      data: null,
    })
  }
  //* -------------------------------------------------------------------------- */

  return (
    <Fragment>
      <Wedge
        name={data.product}
        x={width / 4}
        y={height / 2}
        radius={radius}
        angle={(360 / total) * data.value}
        fill={data.backgroundColor}
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
        shadowColor={hover.didHover ? 'black' : 'transparent'}
        shadowBlur={hover.didHover ? 10 : 0}
        shadowOpacity={hover.didHover ? 0.6 : 0}
        shadowOffsetX={hover.didHover ? 10 : 0}
        shadowOffsetY={hover.didHover ? 10 : 0}
      />
      {hover.didHover && (
        <ToolTip data={hover.data} />
      )}
    </Fragment>
  )
}

export default Pie
