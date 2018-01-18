import React from 'react';
import { Chart, Tooltip, Geom, Legend, Axis } from 'bizcharts';
import DataSet from '@antv/data-set';
import Slider from 'bizcharts-plugin-slider';
import autoHeight from '../autoHeight';

@autoHeight()
export default class TrendChart extends React.Component {
  constructor(props) {
    super(props);

    this.onChange = this.onChange.bind(this);
  }

  onChange({ startValue, endValue }) {
    this.ds.setState('start', new Date(startValue).getTime());
    this.ds.setState('end',  new Date(endValue).getTime());
  }

  render() {
    const {
      data = [],
    } = this.props;

    if (data.length === 0) return null;

    const ds = this.ds = new DataSet({
      state: {
        start: new Date(data[0].Date).getTime(),
        end: new Date(data[data.length - 1].Date).getTime()
      }
    });
    const originDv = ds.createView('origin');
    originDv.source(data)
      .transform({
        type: 'fold',
        fields: [ 'Revenue', 'UserCount' ],
        key: 'type',
        value: 'value',
        retains: [ 'Revenue', 'UserCount', 'Weather-PM25', 'Date' ]
      });

    const chartDv = ds.createView();
    chartDv.source(data)
      .transform({
        type: 'fold',
        fields: [ 'Revenue', 'UserCount' ],
        key: 'type',
        value: 'value',
        retains: [ 'Revenue', 'UserCount', 'Weather-PM25', 'Date' ]
      })
      .transform({
        type: 'filter',
        callback(obj) {
          const time = new Date(obj.Date).getTime(); // !注意：时间格式，建议转换为时间戳进行比较
          return time >= ds.state.start && time <= ds.state.end;
        }
      });

    // https://alibaba.github.io/BizCharts/demo-detail.html?code=demo/other/rain-and-flow
    // comparing with Wheather? PM25 & Temprature
    return (
      <div>
        <Chart
          height={400}
          data={chartDv}
          scale={{ Date: { type: 'time' }, UserCount: { type: 'linear', alias: 'User Count' }, Revenue: { type: 'linear'} }}
          padding={[60, 80, 40, 60]}
          forceFit>
          <Axis name="Date" />
          <Axis name="Revenue" title={{}}/>
          <Axis name="UserCount" title={{}}/>
          <Tooltip />
          <Geom type="line" position="Date*Revenue" size={2} color="lightblue" />
          <Geom type="line" position="Date*UserCount" size={2} color="lightgreen" />
        </Chart>
        <div>
          <Slider
            width='auto'
            height={26}
            start={ds.state.start}
            end={ds.state.end}
            xAxis="Date"
            yAxis="value"
            scales={{Date:{type: 'time',tickCount: 10, mask:'M/DD' }}}
            data={originDv}
            backgroundChart={{type: 'line'}}
            onChange={this.onChange}
            padding={[60, 80, 40, 60]}
          />
        </div>
      </div>
    );
  }
}
