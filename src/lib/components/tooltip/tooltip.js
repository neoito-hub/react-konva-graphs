import React from 'react';
import { Rect, Text, Group } from "react-konva";

const ToolTip = ({position}) => {
    const {x,y} = position
    return (
        <Group x={x} y={y}>
            <Rect width={120} height={50} fill="rgba(0,0,0,0.9)" cornerRadius={8} />
            <Text fill="#fff" text="June" fontStyle="bold" x={10} y={8}/>
            <Text fill="#fff" text="Data 26"  x={10} y={24}/>

        </Group>)
}

export default ToolTip;