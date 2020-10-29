import React from 'react'
import { Text, Rect, Group } from 'react-konva'

const Scale = ({ idx, width, height, radius, data, position, totalInput }) => {
  return (
    <Group x={position.x} y ={position.y}>
      <Rect
        width={15}
        height={10}
        fill={data.backgroundColor}
        stroke="black"
        strokeWidth={1}
      />
      <Text
        text={data.label.slice(0, 1).toUpperCase() + data.label.slice(1)}
        x={width/10 +15}
        width={400}
      />
    </Group>
  )
}

export default Scale
