import React, { useState, useEffect } from "react";
import { Text, Stage, Layer } from "react-konva";
import PieGroup from "./components/PieGroup";
// import ToolTip from "../../tooltip/tooltip";

const PieChart = ({ id, data, width, height, options }) => {
  // combine label,values,color to a array of objects
  const createDataset = (dataObject) => {
    return dataObject.labels.reduce((combinedData, data, idx) => {
      combinedData.push({
        product: dataObject.datasets.dataValues[idx],
        value: data,
        backgroundColor: dataObject.datasets.backgroundColor[idx],
      });
      return combinedData;
    }, []);
  };

  /* ------------------------- Usestate and UseEffcet ------------------------- */
  const [graphDetails, setGraphDetails] = useState({
    id,
    x: 150,
    y: 150,
    width,
    height,
    dataArray: createDataset(data),
  });
  // console.log(graphDetails.dataArray); //NO error
  const [selectedId, selectShape] = useState(null);

  useEffect(() => {
    setGraphDetails((preValue) => {
      return {
        ...preValue,
      };
    });
  }, []);
  /* -------------------------------------------------------------------------- */

  /* ----------------------------- Other Functions ---------------------------- */
  // to deselect when clicked outside the transformer
  const checkDeselect = (e) => {
    const clickedOnEmpty = e.target === e.target.getStage();
    if (clickedOnEmpty) {
      selectShape(null);
    }
  };
  /* -------------------------------------------------------------------------- */

  return (
    <Stage
      x={0}
      y={0}
      width={window.innerWidth}
      height={window.innerHeight}
      onMouseDown={checkDeselect}
      onTouchStart={checkDeselect}
    >
      <Layer>
        <Text
          x={10}
          width={window.innerWidth - 200}
          align='center'
          text='Pie Chart'
          stroke='black'
          fontSize={36}
        />
        {/* Make this a map function */}
        <PieGroup
          groupValue={graphDetails}
          isSelected={graphDetails.id === selectedId}
          onSelect={() => {
            selectShape(graphDetails.id);
          }}
          onChange={(newAttrs) => {
            // const rects = rectangles.slice();
            // rects[i] = newAttrs;
            setGraphDetails(newAttrs);
          }}
        />
      </Layer>
    </Stage>
  );
};

export default PieChart;
