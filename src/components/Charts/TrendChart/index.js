import React from 'react';
import { Chart, Tooltip, Geom, Legend, Axis } from 'bizcharts';
import DataSet from '@antv/data-set';
import Slider from 'bizcharts-plugin-slider';
import autoHeight from '../autoHeight';

@autoHeight()
export default class TrendChart extends React.Component {
  render() {
    const {
      data = [],
    } = this.props;

    const ds = new DataSet();
    const dv = ds.createView().source(data);
    dv.transform({
      type: 'fold',
      fields: ['Revenue', 'UserCount'],
      key: 'key',
      value: 'value',
    });

    // https://alibaba.github.io/BizCharts/demo-detail.html?code=demo/other/rain-and-flow
    // comparing with Wheather? PM25 & Temprature
    return (
      <Chart
        height={400}
        data={data}
        scale={{ Date: { type: 'time' } }}
        padding={[60, 40, 40, 60]}
        forceFit>
        <Axis name="Date" />
        <Axis name="Revenue" />
        <Axis name="UserCount" />
        <Tooltip />
        <Legend name="key" position="top" />
        <Geom type="line" position="Date*Revenue" size={2} color="lightblue" />
        <Geom type="line" position="Date*UserCount" size={2} color="lightgreen" />
      </Chart>
    );
  }
}
