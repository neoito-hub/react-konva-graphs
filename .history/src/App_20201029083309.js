import React, { useState } from 'react'
// import { nanoid } from 'nanoid'
import { Stage, Layer } from 'react-konva'
import { PieChart, BarChart,DonutChart } from './lib'

function App() {
  // Data passes as per Chart.js
  const dataPie = {
    labels: [
      'Saudi Arabia',
      'Russia',
      'Iraq',
      'United Arab Emirates',
      'Canada',
      'India',
      'China',
      'Fiji',
      'North Korea',
      'USA',
      'Ghana',
      'Rwanda',
      'DRK',
      'Chile',
      'Nepal',
      'Spain',
    ],
    datasets: {
      label: 'Population ',
      data: [
        133.3,
        86.2,
        52.2,
        51.2,
        50.2,
        20.2,
        40.6,
        10.2,
        0.7,
        9,
        20,
        90,
        3,
        30,
        40,
        60,
      ],
      backgroundColor: ['#FF6384', '#63FF84', '#84FF63', '#8463FF', '#6384FF'],
    },
  }

  const dataBar = {
    labels: [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ],
    datasets: {
      label: 'Population',
      backgroundColor: [],
      data: [6300, 200, 5520, 3760, 9, 320, 819, 1308, 405, 2101, 640, 1999],
    },

    hoverBorderColor: 'red',
    borderWidth: 1,
  }

  const [selectedId, selectShape] = useState(null)

  /* ----------------------------- Methods ---------------------------- */
  // to deselect when clicked outside the transformer
  const checkDeselect = (e) => {
    const clickedOnEmpty = e.target === e.target.getStage()
    if (clickedOnEmpty) {
      selectShape(null)
    }
  }
  /* -------------------------------------------------------------------------- */

  return (
    <Stage
      width={window.innerWidth}
      height={window.innerHeight}
      onMouseDown={checkDeselect}
      onTouchStart={checkDeselect}
    >
      <Layer>
        <BarChart
          data={dataBar}
          width={600}
          height={400}
          x={0}
          y={0}
          options={{
            responsive: true,
          }}
        />

        <PieChart
          height={200}
          width={200}
          x={700}
          y={100}
          data={dataPie}
          options={{
            responsive: true,
          }}
          selectShape={selectShape}
          selectedId={selectedId}
        />
        <DonutChart
          height={200}
          width={200}
          x={950}
          y={100}
          data={dataPie}
          options={{
            responsive: true,
          }}
          selectShape={selectShape}
          selectedId={selectedId}
        />
      </Layer>
    </Stage>
  )
}

export default App
