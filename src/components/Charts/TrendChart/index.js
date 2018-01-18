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
      retains: ['Date', 'Revenue', 'UserCount'],
    });

    // https://alibaba.github.io/BizCharts/demo-detail.html?code=demo/other/rain-and-flow
    // comparing with Wheather? PM25 & Temprature
    return (
      <Chart
        height={400}
        data={dv}
        scale={{ Date: { type: 'time' }, Revenue: { type: 'linear' }, UserCount: { type: 'linear' }}}
        padding={[100, 100, 100, 100]}
        forceFit>
        <Axis name="Date" title="Date" />
        <Axis name="Revenue" title="Revenue" />
        <Axis name="UserCount" title="UserCount" />
        <Tooltip />
        <Legend />
        <Geom type="line" position="Date*Revenue" size={2} color="lightblue" />
        <Geom type="line" position="Date*UserCount" size={2} color="lightgreen" />
      </Chart>
    );
  }
}
