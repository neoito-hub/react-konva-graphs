import React from "react";
import { Text, Line, Rect, Group } from "react-konva";
import { nanoid } from "nanoid";
import ToolTip from "../../tooltip/tooltip";

const BarChart = ({ data, width, height, options }) => {

    const [toolTipPosition, setToolTipPosition] = React.useState({ x: null, y: null })
    const [showToolTip, setShowToolTip] = React.useState(false)

    const groupRef = React.useRef();

    const barWidth = 0.70; // 70% of interval 
    const minVal = Math.min(...data.datasets[0].data);
    const maxVal = Math.max(...data.datasets[0].data);
    let absoluteMax = maxVal;

    if (Math.abs(minVal) > maxVal) absoluteMax = Math.abs(minVal);
    let a = Math.ceil(absoluteMax / data.datasets[0].data.length);
    let b = a.toString().length;

    if (b > 1) a = parseInt(a / Math.pow(10, b - 1)) * Math.pow(10, b - 1);
    const yAxisInt = a;
    const positiveTicks = Math.ceil(maxVal / a);
    // const negativeTicks = Math.ceil(-minVal / a);
    const yAxisTicks = positiveTicks;
    const labelLength = data.labels.length;
    const horizontalInterval = width / labelLength;
    const verticalInterval = height / yAxisTicks;

    const reDraw = (e) => {
        groupRef.current.getLayer().batchDraw();
    }

    const setHoverProps = (e, gid) => {
        setShowToolTip(true);
        setToolTipPosition({
            x: e.target.getAttr("x") + 20,
            y: e.target.getAttr("y") - 20
        });
        e.target.setAttrs({
            stroke: "rgba(255,99,132,1)",
            fill: "rgba(255,99,132,0.4)"
        });

        console.log(showToolTip)
        reDraw(e);
    }

    const resetHoverProps = (e, gid) => {
        console.log("out")
        setShowToolTip(false);
        e.target.setAttrs({
            stroke: "rgba(255,99,132,1)",
            fill: "rgba(255,99,132,0.2)"
        });
        setToolTipPosition({
            x: e.evt.pageX,
            y: e.evt.pageY
        });
        reDraw(e);
    }

    const HorizontalLines = () => {
        return ([...Array(yAxisTicks + 1)].map((item, i) => {
            console.log("looping")
            const y = height - (i * verticalInterval);
            const id = nanoid();
            return (<Line listening={false} id={id} key={id} points={[0, y, 0, y, width, y]} strokeWidth={0.9} stroke="#c1c1c1" />)
        }));
    }

    const VerticalLines = () => {
        // const horizontalInterval = (width / yAxisTicks);
        return ([...Array(yAxisTicks)].map((item, i) => {
            console.log("looping")
            const y = width - (i * horizontalInterval);
            const id = nanoid();
            return (<Line listening={false} id={id} key={id} points={[y, 0, y, height, y]} strokeWidth={0.9} stroke="#c1c1c1" />
            )
        }));
    }

    const Bars = ({ groupId }) => {
        const graphRange = yAxisTicks * yAxisInt;
        return ([...Array(labelLength)].map((item, i) => {
            const barRatio = data.datasets[0].data[i] / graphRange;
            const bw = (horizontalInterval * (barWidth * 100) / 100);
            const bh = barRatio * height;
            const x = (horizontalInterval * i) + (horizontalInterval - bw) / 2;
            const y = height - bh;
            const id = nanoid();
            return (<Rect id={id} key={id} width={bw} height={bh} x={x} y={y} fill="rgba(255,99,132,0.2)" stroke="rgba(255,99,132,1)"
                onMouseOver={(e) => setHoverProps(e, groupId)}
                onMouseOut={(e) => resetHoverProps(e, groupId)} 
                />
            )
        }));
    }

    const setRectRef = (e) => {
        console.log("red", e)
    }

    const groupId = nanoid();
    return (
        <>
            <Group x={20} y={20} id={groupId} ref={groupRef} draggable={true}>
                <Rect fill="#fff" width={width} height={height}
                    onClick={() => setShowToolTip(false)}
                />

                {/* horizontal lines */}
                <HorizontalLines />

                {/* vertical lines */}
                <VerticalLines />

                {/* bars */}
                <Bars groupId={groupId} />

            </Group>
            {showToolTip && <ToolTip position={toolTipPosition} />}
        </>)
}

export default BarChart;