import React from "react";
// import { nanoid } from "nanoid";
import { Stage, Layer } from "react-konva";
import { PieChart } from "./lib";

function App() {
  const dataPie = [
    {
      labels: [
        "Saudi Arabia",
        "Russia",
        "Iraq",
        "United Arab Emirates",
        "Canada",
      ],
      datasets: {
        dataValues: [133.3, 86.2, 52.2, 51.2, 50.2],
        backgroundColor: [
          "#FF6384",
          "#63FF84",
          "#84FF63",
          "#8463FF",
          "#6384FF",
        ],
      },
    },
  ];

  return (
    <Stage width={window.innerWidth} height={window.innerHeight}>
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
            key={idx}
            id={idx}
            height={300}
            width={300}
            data={data}
            options={{
              responsive: true,
            }}
          />
        ))}
      </Layer>
    </Stage>
  );
}

export default App;
