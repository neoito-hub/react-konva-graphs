import React from "react";
import { Stage, Layer } from "react-konva";
import { BarChart, PieChart } from "./lib"

function App() {
  const data = {
    labels: ["Jan", "Feb"],
    data: [20, 30],
    heading: "Bar chart",
    hoverBorderColor: "red",
    borderWidth: 1,
    colorSet: [] // color value for each bar, preset colors if empty
  }

  return (
    <Stage width={window.innerWidth} height={window.innerHeight}>
      <Layer>
        <BarChart
          data={data}
          width={600}
          height={400}
          options={{
            responsive: true
          }} />
        {/* <PieChart /> */}
      </Layer>
    </Stage>
  );
}

export default App;
