# react-konva-graphs

react-konva-graphs is a package made with konva js to draw graphs/charts easily into the workspace.

Currently, we support 4 types of graphs

1. Bar Chart
2. Line Chart
3. Pie Chart
4. Donut Chart

## Installation

Use npm or yarn to install react-konva-graphs.

```
npm install react-konva-graphs
```

or

```
yarn add react-konva-graphs
```

## Usage

#### Bar Chart

```jsx
import React from 'react';
import { Stage, Layer } from 'react-konva';
import { BarChart } from 'react-konva-graphs';


function App() {

   const data = {
       labels: ['Saudi Arabia','Russia','Iraq','United Arab Emirates',
                'Canada','India','China','Fiji','North Korea','USA',
                'Ghana','Rwanda','DRK','Chile','Nepal','Spain'],
       datasets: {
        label: 'Population ',
          data: [133.3,86.2,52.2,51.2,50.2,20.2,40.6,90.2,0.7,9,20,
                 90,30,30,40,60],
       backgroundColor: ['#FF6384', '#63FF84', '#84FF63', '#8463FF', '#6384FF'],
    },
    hoverBorderColor: 'red',
  };

 //this is the structure of data that needs to be fed into bar chart.

return (
    <Stage
      width={window.innerWidth}
      height={window.innerHeight}
      onMouseDown={checkDeselect}
      onTouchStart={checkDeselect}>
      <Layer>
        <BarChart
          data={data}
          width={600}
          height={500}
          x={0}
          y={0}
          options={{
            showGrid: true
          }}
        />
      );

}
export default App;
```

Bar chart accepts the following props
| Name | Description |
|------|-------------|
| data | The dataset which needs to be passed |
| width | Width of graph |
| Height | Height of graph|
|x | X coordinate to place graph in canvas|
|y | Y coordinate to place graph in canvas|
|option | currently we only support `showGrid` option which accepts a boolean value

#### Line Chart

```jsx
import React from 'react';
import { Stage, Layer } from 'react-konva';
import { BarChart } from 'react-konva-graphs';


function App() {

   const data = {
       labels: ['Saudi Arabia','Russia','Iraq','United Arab Emirates',
                'Canada','India','China','Fiji','North Korea','USA',
                'Ghana','Rwanda','DRK','Chile','Nepal','Spain'],
       datasets: {
        label: 'Population ',
          data: [133.3,86.2,52.2,51.2,50.2,20.2,40.6,90.2,0.7,9,20,
                 90,30,30,40,60],
       backgroundColor: ['#FF6384', '#63FF84', '#84FF63', '#8463FF', '#6384FF'],
    },
    hoverBorderColor: 'red',
  };

 //this is the structure of data that needs to be fed into Line chart.

return (
    <Stage
      width={window.innerWidth}
      height={window.innerHeight}
      onMouseDown={checkDeselect}
      onTouchStart={checkDeselect}>
      <Layer>
        <BarChart
          data={data}
          width={600}
          height={500}
          x={0}
          y={0}
          options={{
            showGrid: true
          }}
        />
      );

}
export default App;
```

Line chart accepts the following props
| Name | Description |
|------|-------------|
| data | The dataset which needs to be passed |
| width | Width of graph |
| Height | Height of graph|
|x | X coordinate to place graph in canvas|
|y | Y coordinate to place graph in canvas|
|option | currently we only support `showGrid` option which accepts a boolean value



#### Pie Chart

```jsx
import React from 'react';
import { Stage, Layer } from 'react-konva';
import { PieChart } from 'react-konva-graphs';


function App() {

   const data = {
       labels: ['Saudi Arabia','Russia','Iraq','United Arab Emirates',
                'Canada','India','China','Fiji','North Korea','USA',
                'Ghana','Rwanda','DRK','Chile','Nepal','Spain'],
       datasets: {
        label: 'Population ',
          data: [133.3,86.2,52.2,51.2,50.2,20.2,40.6,90.2,0.7,9,20,
                 90,30,30,40,60],
       backgroundColor: ['#FF6384', '#63FF84', '#84FF63', '#8463FF', '#6384FF'],
    },
  };

 //this is the structure of data which needs to be fed into pie chart.

return (
    <Stage
      width={window.innerWidth}
      height={window.innerHeight}
      onMouseDown={checkDeselect}
      onTouchStart={checkDeselect}>
      <Layer>
        <PieChart
          data={data}
          width={600}
          height={500}
          x={0}
          y={0}
        />
      );

}
export default App;
```

Pie chart accepts the following props
| Name | Description |
|------|-------------|
| data | The dataset which needs to be passed |
| width | Width of graph |
| Height | Height of graph|
|x | X coordinate to place graph in canvas|
|y | Y coordinate to place graph in canvas|


#### Donut Chart

```jsx
import React from 'react';
import { Stage, Layer } from 'react-konva';
import { DonutChart } from 'react-konva-graphs';


function App() {

   const data = {
       labels: ['Saudi Arabia','Russia','Iraq','United Arab Emirates',
                'Canada','India','China','Fiji','North Korea','USA',
                'Ghana','Rwanda','DRK','Chile','Nepal','Spain'],
       datasets: {
        label: 'Population ',
          data: [133.3,86.2,52.2,51.2,50.2,20.2,40.6,90.2,0.7,9,20,
                 90,30,30,40,60],
       backgroundColor: ['#FF6384', '#63FF84', '#84FF63', '#8463FF', '#6384FF'],
    },
  };

 //this is the structure of data that needs to be fed into DonutChart.

return (
    <Stage
      width={window.innerWidth}
      height={window.innerHeight}
      onMouseDown={checkDeselect}
      onTouchStart={checkDeselect}>
      <Layer>
        <PieChart
          data={data}
          width={600}
          height={500}
          x={0}
          y={0}
        />
      );

}
export default App;
```

Donut Chart accepts the following props
| Name | Description |
|------|-------------|
| data | The dataset which needs to be passed |
| width | Width of graph |
| Height | Height of graph|
|x | X coordinate to place graph in canvas|
|y | Y coordinate to place graph in canvas|




## Contributing

Pull requests are welcome. For changes, please open an issue first to discuss what you would like to change.

For development, clone the repo, then run

### `yarn install`

### `yarn start`

Runs the app in the development mode.
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `yarn generate`

This will generate a dist dir that contains components that can be imported into any react-konva app.

## License

[MIT](https://choosealicense.com/licenses/mit/)
