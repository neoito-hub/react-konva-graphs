import React, { useState, useEffect, Fragment } from "react";
import { Text } from "react-konva";
import PieGroup from "./components/PieGroup";

const PieChart = ({ id, data, width, height, options, selectedId, selectShape, }) => {
  
  // combine label,values,color to a array of objects
  const createDataset = (dataObject) => {
    return dataObject.labels.reduce((combinedData, data, idx) => {
      combinedData.push({ product: data, value: dataObject.datasets.dataValues[idx], backgroundColor: dataObject.datasets.backgroundColor[idx]});
      return combinedData;
    }, []);
  };

//*? ------------------------- Hooks------------------------- */
  const [graphDetails, setGraphDetails] = useState(
    { id, x: 150, y: 150, width, height, dataArray: createDataset(data), });
 
  useEffect(() => { setGraphDetails((preValue) => { return { ...preValue, }; }); }, []);
//*? -------------------------------------------------------------------------- */

  return (
    <Fragment>
      <Text x={10} width={window.innerWidth - 200} align='center' text='Pie Chart' stroke='black' fontSize={36} />

      <PieGroup groupValue={graphDetails} isSelected={graphDetails.id === selectedId} 
        onSelect={() => { selectShape(graphDetails.id); }}
        onChange={(newAttrs) => {
          // const rects = rectangles.slice(); // rects[i] = newAttrs;
           setGraphDetails(newAttrs);
        }}
      />
    </Fragment>
  );
};

export default PieChart;
