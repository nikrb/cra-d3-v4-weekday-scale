import React from 'react';
import PropTypes from 'prop-types';
import * as d3 from 'd3';
import Line from './Line';
import XYAxis from './XYAxis';
import scaleDayselect from '../../dayselect.js';
import weekday from '../../weekday';

export default class LineChart extends React.Component {
  static propTypes = {
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    margin: PropTypes.object.isRequired,
    data: PropTypes.array.isRequired
  };
  render = () => {
    const {width,height,margin,data} = this.props;
    const inner_width = width-margin.left-margin.right;
    const inner_height = height - margin.top - margin.bottom;
    const transform = `translate( ${margin.left}, ${margin.top})`;
    // parse the date / time
    const parseTime = d3.timeParse("%Y-%m-%d");

    const weekday_data = data.map( (d) => {
      return { date: parseTime( d.date), weekday: weekday( d.date), close: d.value};
    });

    // set the ranges
    // const xScale = d3.scaleTime().range([0, inner_width]);

    const weekday_extent = d3.extent(weekday_data, function(d) { return d.weekday; });
    const xScale = scaleDayselect( weekday, xScale).range([0, inner_width]);
    const yScale = d3.scaleLinear().range([inner_height, 0]);

    // xScale.domain(d3.extent(fd, function(d) { return d.date; }));
    xScale.domain(weekday_extent);
    yScale.domain([d3.min(weekday_data, d => d.close), d3.max(weekday_data, d => d.close )]);

    const lines = <Line data={weekday_data} xScale={xScale} yScale={yScale}
          fill="transparent" stroke="black"/>;

    const dots = weekday_data.map( (line,i) => {
      return line.map( (l,j) => {
        return <circle key={i*100+j} cx={xScale(l.date)} cy={yScale(l.close)}
          r="3" fill="red" />;
      });
    });
    return (
      <svg width={width} height={height}>
        <g transform={transform} >
          {lines}
          {dots}
        </g>
        <XYAxis scales={{xScale,yScale}} margins={margin} height={height} width={width} />
      </svg>
    );
  };
};
