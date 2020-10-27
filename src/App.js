import React, { useState } from "react";
import { nanoid } from "nanoid";
import { Stage, Layer } from "react-konva";
import { PieChart } from "./lib";

function App() {
  // Data passes as per Chart.js
  const dataPie = [
    {
      labels: [ "Saudi Arabia", "Russia", "Iraq", "United Arab Emirates", "Canada", ],
      datasets: {
        dataValues: [133.3, 86.2, 52.2, 51.2, 50.2],
        backgroundColor: [ "#FF6384", "#63FF84", "#84FF63", "#8463FF", "#6384FF", ],
      }
    },
  ];

  const [selectedId, selectShape] = useState(null);

  /* ----------------------------- Methods ---------------------------- */
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
      width={window.innerWidth}
      height={window.innerHeight}
      onMouseDown={checkDeselect}
      onTouchStart={checkDeselect}
    >
      <Layer>
        {/* <BarChart
          data={data}
          width={600}
          height={400}
          options={{
            responsive: true
          }} /> */}
        {dataPie.map((data, idx) => (
          <PieChart
            key={nanoid()}
            id={idx}
            height={200}
            width={200}
            data={data}
            options={{
              responsive: true,
            }}
            selectShape={selectShape}
            selectedId={selectedId}
          />
        ))}
      </Layer>
    </Stage>
  );
}

export default App;
