import React, { Component } from 'react';
import Chart from './Chart';
import './App.css';
import data from './data.json';

class App extends Component {
  render() {
    const td = data.map( (d) => {
      return { date: d.date, value: +d.value};
    });
    console.log( td);
    return (
      <div className="App">
        <Chart data={td} />
      </div>
    );
  }
}

export default App;
