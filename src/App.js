import React from "react";
import { Stage, Layer } from "react-konva";
import { BarChart, PieChart } from "./lib"

function App() {
  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    datasets: [{
      label: "Population",
      backgroundColor: [],
      data: [6300, 200, 5520, 3760, 9, 320, 819, 1308, 405, 2101, 640, 1999]
    }],
    hoverBorderColor: "red",
    borderWidth: 1,
  }

  return (
    <Stage width={1368} height={window.innerHeight}>
      <Layer>
        <BarChart
          data={data}
          width={600}
          height={400}
          options={{
            responsive: true,
            showGrid: true
          }} />

        {/* <BarChart
          data={data}
          width={400}
          height={200}
          options={{
            responsive: true
          }} /> */}


        {/* <PieChart /> */}
      </Layer>
    </Stage>
  );
}

export default App;
