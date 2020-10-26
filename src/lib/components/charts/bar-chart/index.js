import React from "react";
import { Text, Line, Rect, Group } from "react-konva";
import { nanoid } from "nanoid";
import ToolTip from "../../tooltip/tooltip";

const BarChart = ({ data, width, height, options }) => {
    const [toolTipPosition, setToolTipPosition] = React.useState({ x: null, y: null, dataPlotted: null, label: null })
    const [showToolTip, setShowToolTip] = React.useState(false)
    // const [labels, setLabels] = React.useState(data.labels);
    // const [dataToPlot, setDataToPlot] = React.useState(data.datasets[0].data)
    const groupRef = React.useRef();
    const labels = data.labels;
    const dataToPlot = data.datasets[0].data;
    const barWidth = 0.70; // 70% of interval 
    const minVal = Math.min(...dataToPlot);
    const maxVal = Math.max(...dataToPlot);
    let absoluteMax = maxVal;

    if (Math.abs(minVal) > maxVal) absoluteMax = Math.abs(minVal);
    let a = Math.ceil(absoluteMax / dataToPlot.length);
    let b = a.toString().length;

    if (b > 1) a = parseInt(a / Math.pow(10, b - 1)) * Math.pow(10, b - 1);
    let scaleFactor = 0;
    let scaleSuffix = "";
    const yAxisInt = a;
    const positiveTicks = Math.ceil(maxVal / a);
    const negativeTicks = Math.ceil(-minVal / a);
    const yAxisTicks = positiveTicks;
    const labelLength = data.labels.length;
    const horizontalInterval = width / labelLength;
    const verticalInterval = height / yAxisTicks;
    if (absoluteMax > 10000000) {
        scaleFactor = 1000000;
        scaleSuffix = "M";
    } else if (absoluteMax > 10000) {
        scaleFactor = 1000;
        scaleSuffix = "K";
    } else {
        scaleFactor = 1;
        scaleSuffix = "";
    }

    const reDraw = (e) => {
        groupRef.current.getLayer().batchDraw();
    }

    const setHoverProps = (e, gid,dataPlotted, label) => {
        setShowToolTip(true);
        console.log(e.evt)
        setToolTipPosition({
            x: e.evt.pageX + horizontalInterval/2,
            y: e.evt.pageY - 20,
            dataPlotted: data.datasets[0].label+": "+dataPlotted,
            label: label,
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
    };

    const HorizontalLines = () => {
        let verticalIndex = -negativeTicks;
        return ([...Array(yAxisTicks + 1)].map((item, i) => {
            console.log("looping")
            const y = height - (i * verticalInterval);
            const id = nanoid();
            let yLabel = verticalIndex * yAxisInt / scaleFactor;
            console.log()
            yLabel = yLabel.toString() + scaleSuffix;
            verticalIndex++;
            return (<>
                <Line listening={false} id={id} key={id} points={[-5, y, 0, y, width, y]} strokeWidth={0.9} stroke="#c1c1c1" />
                <Text text={yLabel} y={y - 10} x={-40} fill="#000" />
            </>)
        }));
    };

    const VerticalLines = () => {
        // const horizontalInterval = (width / yAxisTicks);
        return ([...Array(yAxisTicks)].map((item, i) => {
            console.log("looping")
            const x = width - (i * horizontalInterval);
            const id = nanoid();
            return (<><Line listening={false} id={id} key={id} points={[x, 0, x, height, x]} strokeWidth={0.9} stroke="#c1c1c1" />
                <Text text={labels[i]} x={x - horizontalInterval} y={height+5} fill="#000" />
            </>)
        }));
    };

    const Bars = ({ groupId }) => {
        const graphRange = yAxisTicks * yAxisInt;
        return (labels.map((item, i) => {
            const barRatio = dataToPlot[i] / graphRange;
            const bw = (horizontalInterval * (barWidth * 100) / 100);
            const bh = barRatio * height;
            const x = (horizontalInterval * i) + (horizontalInterval - bw) / 2;
            const y = height - bh;
            const id = nanoid();
            return (<Rect id={id} key={id} width={bw} height={bh} x={x} y={y} fill="rgba(255,99,132,0.2)" stroke="rgba(255,99,132,1)"
                onMouseOver={(e) => setHoverProps(e, groupId, dataToPlot[i], labels[i])}
                onMouseOut={(e) => resetHoverProps(e, groupId)}
            />
            )
        }));
    }

    const groupId = nanoid();

    return (
        <>
            <Group x={60} y={60} id={groupId} ref={groupRef} draggable={true}>
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