import { nanoid } from 'nanoid';
import React, { Fragment, useRef, useEffect, useState } from 'react';
import { Group, Transformer, Text, Rect } from 'react-konva';
import ToolTip from '../../../tooltip/tooltip';
import Pie from './Pie';
import Scale from './Scale';

const PieGroup = ({
  groupValue,
  groupValue: {
    x,
    y,
    height,
    width,
    dataArray,
    label
  },
  isSelected,
  onSelect,
  onChange
}) => {
  //*? ----------------------------- React hooks ---------------------------- */
  const [hoverData, setHoverData] = useState({
    didHover: false
  });
  const [showToolTip, setShowToolTip] = useState(false);
  const [prevHoverId, setPreviousHoverId] = useState(null);
  const shapeRef = useRef();
  const trRef = useRef();
  useEffect(() => {
    if (isSelected) {
      // we need to attach transformer manually
      trRef.current.nodes([shapeRef.current]);
      trRef.current.getLayer().batchDraw();
    }
  }, [isSelected]); //*? -------------------------------------------------------------------------- */
  // getting sum to find the percent of sector

  const getSum = combinedDataArray => combinedDataArray.reduce((total, item) => total + item.value, 0);

  let sum = getSum(dataArray); // getRotation function to find where the wedge should start

  let totalDeg = 0;

  let getRotation = (idx, item) => {
    if (dataArray.length - 1 === idx) {
      let current = totalDeg;
      totalDeg = 0;
      return current;
    } else {
      let current = totalDeg;
      totalDeg += 360 / sum * item.value;
      return current;
    }
  }; // calculates the position where legends should be placed


  let currentStart = 0;
  let xBuffer = 50;
  let yBuffer = 20;
  let yAxisBreakCount = 0;

  const getPosition = (item, idx) => {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    const w = context.measureText(item.label).width;

    if (currentStart > width) {
      currentStart = 0;
      yAxisBreakCount++;
    }

    const x = currentStart;
    currentStart = x + w + xBuffer;
    return {
      x: x,
      y: yBuffer * yAxisBreakCount
    };
  };

  return console.log('rerende'), /*#__PURE__*/React.createElement(Fragment, null, /*#__PURE__*/React.createElement(Group, {
    x: x,
    y: y,
    height: height,
    width: width,
    draggable: true,
    onClick: onSelect,
    onTap: onSelect,
    ref: shapeRef // onDragEnd={(e) => {
    //   onChange({ ...groupValue, x: e.target.x(), y: e.target.y() })
    // }}
    // onTransformEnd={(e) => {
    //   const node = shapeRef.current
    //   //   const scaleX = node.scaleX();
    //   //   const scaleY = node.scaleY();
    //   // we will reset it back
    //   //   node.scaleX(1);
    //   //   node.scaleY(1);
    //   onChange({
    //     ...groupValue,
    //     x: node.x(),
    //     y: node.y(),
    //     // set minimal value
    //     // width: Math.max(50, node.width() * scaleX),
    //     // height: Math.max(node.height() * scaleY),
    //     // ! instead of reseting it back and enlarging it to the dragged size..
    //     //! just make the dragged size remain
    //     width: Math.max(50, node.width()),
    //     height: Math.max(node.height()),
    //   })
    // }}

  }, /*#__PURE__*/React.createElement(Rect, {
    x: 0,
    width: width + xBuffer,
    height: height + xBuffer,
    fill: "rgba(255,255,255,0.0)"
  }), label ? /*#__PURE__*/React.createElement(Text, {
    x: width / 2 - xBuffer,
    y: -50,
    fontSize: 20,
    text: label
  }) : null, /*#__PURE__*/React.createElement(Group, null, dataArray.map((item, idx) => /*#__PURE__*/React.createElement(Scale, {
    key: nanoid(),
    idx: idx,
    width: width / 3,
    height: height // radius={width / 3 > height ? height / 2 : width / 3}
    ,
    data: item,
    position: getPosition(item, idx),
    totalInput: dataArray.length
  }))), /*#__PURE__*/React.createElement(Group, {
    x: width / 2 - xBuffer,
    y: yBuffer * yAxisBreakCount + xBuffer
  }, dataArray.map((item, idx) => /*#__PURE__*/React.createElement(Pie, {
    key: nanoid(),
    idx: idx,
    width: 2 * width / 3,
    height: height,
    radius: 2 * width / 3 > height / 2 ? height / 2 : width / 3,
    data: item,
    total: sum,
    rotation: getRotation(idx, item),
    totalInput: dataArray.length,
    setHoverData: setHoverData,
    setShowToolTip: setShowToolTip,
    prevHoverId: prevHoverId,
    setPreviousHoverId: setPreviousHoverId
  })))), hoverData.didHover ? /*#__PURE__*/React.createElement(ToolTip, {
    data: hoverData?.data
  }) : null, isSelected && /*#__PURE__*/React.createElement(Transformer, {
    ref: trRef,
    boundBoxFunc: (oldBox, newBox) => {
      // limit resize
      if (newBox.width < 50 || newBox.height < 50) {
        return oldBox;
      }

      return newBox;
    }
  }));
};

export default PieGroup;