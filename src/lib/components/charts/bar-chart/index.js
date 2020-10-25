import React from "react";
import { Text, Line, Rect, Group } from "react-konva";
import ToolTip from "../../tooltip/tooltip";

const BarChart = ({ data, width, height, options }) => {

    const [toolTipPosition, setToolTipPosition] = React.useState({ x: 0, y: 0 })
    const [showToolTip, setShowToolTip] = React.useState(false)

    const reDraw = (e) => {
        e.target.getLayer().batchDraw();
    }

    const setHoverProps = (e) => {
        setShowToolTip(true);
        setToolTipPosition({
            x: e.target.getAttr("x")+80,
            y: e.target.getAttr("y")-20
        });
        e.target.setAttrs({
            stroke: "rgba(255,99,132,1)",
            fill: "rgba(255,99,132,0.4)"
        });

        console.log(toolTipPosition)
        reDraw(e);
    }

    const resetHoverProps = (e) => {
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


    return (
        <>
            <Group x={20} y={20}>
                <Rect fill="#fff" width={width} height={height} />

                {/* horizontal lines */}

                <Line points={[0, 0, 0, 0, 800, 0]} strokeWidth={0.9} stroke="#c1c1c1" />
                <Line points={[0, 100, 0, 100, 800, 100]} strokeWidth={0.9} stroke="#c1c1c1" />
                <Line points={[0, 200, 0, 200, 800, 200]} strokeWidth={0.9} stroke="#c1c1c1" />
                <Line points={[0, 300, 0, 300, 800, 300]} strokeWidth={0.9} stroke="#c1c1c1" />
                <Line points={[0, 400, 0, 400, 800, 400]} strokeWidth={0.9} stroke="#c1c1c1" />

                {/* vertical lines */}

                <Line points={[0, 0, 0, 400, 0]} strokeWidth={0.9} stroke="#c1c1c1" />
                <Line points={[100, 0, 100, 400, 100]} strokeWidth={0.9} stroke="#c1c1c1" />
                <Line points={[200, 0, 200, 400, 200]} strokeWidth={0.9} stroke="#c1c1c1" />
                <Line points={[300, 0, 300, 400, 300]} strokeWidth={0.9} stroke="#c1c1c1" />
                <Line points={[400, 0, 400, 400, 400]} strokeWidth={0.9} stroke="#c1c1c1" />
                <Line points={[500, 0, 500, 400, 500]} strokeWidth={0.9} stroke="#c1c1c1" />
                <Line points={[600, 0, 600, 400, 600]} strokeWidth={0.9} stroke="#c1c1c1" />
                <Line points={[700, 0, 700, 400, 700]} strokeWidth={0.9} stroke="#c1c1c1" />
                <Line points={[800, 0, 800, 400, 800]} strokeWidth={0.9} stroke="#c1c1c1" />

                {/* bars */}

                <Rect width={70} x={15} y={200} height={200} fill="rgba(255,99,132,0.2)" stroke="rgba(255,99,132,1)"
                    onMouseOver={setHoverProps}
                    onMouseOut={resetHoverProps} />

                <Rect width={70} x={115} y={100} height={300} fill="rgba(255,99,132,0.2)" stroke="rgba(255,99,132,1)"
                    onMouseOver={setHoverProps}
                    onMouseOut={resetHoverProps} />

                <Rect width={70} x={215} y={300} height={100} fill="rgba(255,99,132,0.2)" stroke="rgba(255,99,132,1)"
                    onMouseOver={setHoverProps}
                    onMouseOut={resetHoverProps} />

                <Rect width={70} x={315} y={50} height={350} fill="rgba(255,99,132,0.2)" stroke="rgba(255,99,132,1)"
                    onMouseOver={setHoverProps}
                    onMouseOut={resetHoverProps} />

                <Rect width={70} x={415} y={350} height={50} fill="rgba(255,99,132,0.2)" stroke="rgba(255,99,132,1)"
                    onMouseOver={setHoverProps}
                    onMouseOut={resetHoverProps} />

                <Rect width={70} x={515} y={390} height={10} fill="rgba(255,99,132,0.2)" stroke="rgba(255,99,132,1)"
                    onMouseOver={setHoverProps}
                    onMouseOut={resetHoverProps} />

                <Rect width={70} x={615} y={310} height={90} fill="rgba(255,99,132,0.2)" stroke="rgba(255,99,132,1)"
                    onMouseOver={setHoverProps}
                    onMouseOut={resetHoverProps} />

                <Rect width={70} x={715} y={250} height={150} fill="rgba(255,99,132,0.2)" stroke="rgba(255,99,132,1)"
                    onMouseOver={setHoverProps}
                    onMouseOut={resetHoverProps} />

                {showToolTip && <ToolTip position={toolTipPosition} />}
            </Group>
        </>)
}

export default BarChart;