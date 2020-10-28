import React from 'react'
import { Rect, Text, Group } from 'react-konva'

const ToolTip = (props) => {
  const { name, value, x, y } = props.data
  return (
    <Group x={x} y={y}>
      <Rect width={100} height={50} fill="rgba(0,0,0,0.9)" cornerRadius={8} />
      <Text fill="#fff" text={name || ''} fontStyle="bold" x={10} y={8} />
      <Text fill="#fff" text={value || ''} x={10} y={24} />
    </Group>
  )
}

export default ToolTip
