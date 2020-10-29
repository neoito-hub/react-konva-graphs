import React, { Fragment, useState } from 'react'
import { Arc } from 'react-konva'
import ToolTip from '../../../tooltip/tooltip'

const Donut = ({
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
    setHover({
      didHover: true,
      data: {
        x: width/1.5,
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
      <Arc
        name={data.product}
        x={width / 4}
        y={height / 2}
        outerRadius={radius}
        innerRadius={radius/1.5}
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

export default Donut
