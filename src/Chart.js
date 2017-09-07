import React from 'react';
import {LineChart} from './components/charts';

export default class Chart extends React.Component {
  render = () => {
    var margin = {top: 20, right: 50, bottom: 50, left: 20},
        width = 960 - margin.left - margin.right,
        height = 502 - margin.top - margin.bottom;

    return (
      <LineChart data={this.props.data} margin={margin}
        width={width} height={height} />
    );
  };
};
