import React, { Fragment, useRef, useEffect } from "react";
import { Group, Transformer } from "react-konva";
import Pie from "./Pie";
import Scale from "./Scale";

const PieChart = ({
  groupValue,
  groupValue: { x, y, height, width, dataArray },
  isSelected,
  onSelect,
  onChange,
}) => {
  // ! getting sum to find the percent of sector , getRotation function to find where the wedge should start
  const getSum = (combinedDataArray) =>
    combinedDataArray.reduce((total, item) => total + item.value, 0);
  let sum = getSum(dataArray);
  let totalDeg = 0;
  let getRotation = (idx, item) => {
    if (item.value.length - 1 === idx) {
      let current = totalDeg;
      totalDeg = 0;
      return current;
    } else {
      let current = totalDeg;
      totalDeg += (360 / sum) * item.value;
      return current;
    }
  };

  /*//? ----------------------------- React hooks ---------------------------- */

  const shapeRef = useRef();
  const trRef = useRef();
  useEffect(() => {
    if (isSelected) {
      // we need to attach transformer manually
      trRef.current.nodes([shapeRef.current]);
      trRef.current.getLayer().batchDraw();
    }
  }, [isSelected]);
  /* -------------------------------------------------------------------------- */

  return (
    <Fragment>
      {console.log("fdsfgsdgdfgfhf")}
      <Group
        x={150}
        y={100}
        height={height}
        width={width}
        draggable
        onClick={onSelect}
        onTap={onSelect}
        ref={shapeRef}
        onDragEnd={(e) => {
          onChange({
            ...groupValue,
            x: e.target.x(),
            y: e.target.y(),
          });
        }}
        onTransformEnd={(e) => {
          const node = shapeRef.current;
          //   const scaleX = node.scaleX();
          //   const scaleY = node.scaleY();
          // we will reset it back
          //   node.scaleX(1);
          //   node.scaleY(1);
          onChange({
            ...groupValue,
            x: node.x(),
            y: node.y(),
            // set minimal value
            // width: Math.max(50, node.width() * scaleX),
            // height: Math.max(node.height() * scaleY),
            /*// ! instead of reseting it back and enlarging it to the dragged size..
             //! just make the dragged size remain 
             */
            width: Math.max(50, node.width()),
            height: Math.max(node.height()),
          });
        }}
      >
        {
          //* this will return a piechart  */
        }
        {dataArray.map((item, idx) => (
          <Pie
            key={idx}
            idx={idx}
            width={(2 * width) / 3}
            height={height}
            radius={(2 * width) / 3 > height / 2 ? height / 2 : width / 3}
            data={item}
            total={sum}
            rotation={getRotation(idx, item)}
            totalInput={dataArray.length}
          />
        ))}
        {/* //* This will return Scale
         */}
        <Group
          x={(width / 3) * 2}
          y={dataArray.length > 6 ? 0 : height / 2}
          width={width / 3}
        >
          {dataArray.map((item, idx) => (
            <Scale
              key={idx}
              idx={idx}
              width={width / 3}
              height={height}
              radius={width / 3 > height ? height / 2 : width / 3}
              data={item}
              totalInput={dataArray.length}
            />
          ))}
        </Group>
      </Group>

      {isSelected && (
        <Transformer
          ref={trRef}
          boundBoxFunc={(oldBox, newBox) => {
            // limit resize
            if (newBox.width < 50 || newBox.height < 50) {
              return oldBox;
            }
            return newBox;
          }}
        />
      )}
    </Fragment>
  );
};

export default PieChart;
