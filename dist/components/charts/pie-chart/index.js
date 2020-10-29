import React, { useState, useEffect, Fragment } from 'react';
import PieGroup from './components/PieGroup';
const Konva = window.Konva;

const PieChart = ({
  id,
  data,
  width,
  height,
  options,
  x,
  y,
  selectedId,
  selectShape
}) => {
  // combine label,values,color to a array of objects
  const createDataset = dataObject => {
    return dataObject.labels.reduce((combinedData, data, idx) => {
      combinedData.push({
        label: data,
        value: dataObject.datasets.data[idx],
        backgroundColor: dataObject?.datasets?.backgroundColor ? dataObject.datasets.backgroundColor[idx] ? dataObject.datasets.backgroundColor[idx] : Konva.Util.getRandomColor() : Konva.Util.getRandomColor()
      });
      return combinedData;
    }, []);
  }; //*? ------------------------- Hooks------------------------- */


  const [graphDetails, setGraphDetails] = useState({
    id,
    x: x,
    y: y,
    width,
    height,
    label: data.datasets.label,
    dataArray: createDataset(data)
  });
  useEffect(() => {
    setGraphDetails(preValue => {
      return { ...preValue
      };
    });
  }, []); //*? -------------------------------------------------------------------------- */

  return /*#__PURE__*/React.createElement(Fragment, null, /*#__PURE__*/React.createElement(PieGroup, {
    groupValue: graphDetails,
    isSelected: graphDetails.id === selectedId // onSelect={() => {
    //   selectShape(graphDetails.id)
    // }}
    ,
    onChange: newAttrs => {
      // const rects = rectangles.slice(); // rects[i] = newAttrs;
      setGraphDetails(newAttrs);
    }
  }));
};

export default PieChart;