import React from 'react';
import { Chart, Tooltip, Geom, Legend, Axis } from 'bizcharts';
import DataSet from '@antv/data-set';
import Slider from 'bizcharts-plugin-slider';
import numeral from 'numeral';
import autoHeight from '../autoHeight';

@autoHeight()
export default class TrendChartByWeather extends React.Component {
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

    const endDate = new Date(data[data.length - 1].Date);
    const defaultStartDate = new Date(endDate.getFullYear(), endDate.getMonth(), 1);
    const ds = this.ds = new DataSet({
      state: {
        start: defaultStartDate.getTime(),
        end: endDate.getTime()
      }
    });
    const originDv = ds.createView('origin');
    originDv.source(data);

    const revenueDv = ds.createView()
      .source(data)
      .transform({
        type: 'fold',
        key: 'key',
        value: 'revenue',
        fields: ['Revenue', 'AvgRevenue']
      })
      .transform({
        type: 'filter',
        callback(obj) {
          const time = new Date(obj.Date).getTime(); // !注意：时间格式，建议转换为时间戳进行比较
          return time >= ds.state.start && time <= ds.state.end;
        },
      });

    const userCountDv = ds.createView()
      .source(data)
      .transform({
        type: 'fold',
        key: 'key',
        value: 'userCount',
        fields: ['UserCount', 'AvgUserCount']
      })
      .transform({
        type: 'filter',
        callback(obj) {
          const time = new Date(obj.Date).getTime(); // !注意：时间格式，建议转换为时间戳进行比较
          return time >= ds.state.start && time <= ds.state.end;
        },
      });

    // https://alibaba.github.io/BizCharts/demo-detail.html?code=demo/other/rain-and-flow
    // comparing with Wheather? PM25 & Temprature
    return (
      <div>
        <Chart
          height={400}
          data={revenueDv}
          scale={{
            Date: { type: 'time' },
            revenue: { type: 'linear' },
          }}
          padding={[60, 140]}
          forceFit>
          <Axis name="Date" />
          <Axis name="revenue" title={{}} label={{formatter: val => numeral(val).format('0,0')}} />
          <Tooltip />
          <Legend position="right" />
          <Geom type="line" position="Date*revenue" size={2} color="key" />
        </Chart>
        <Chart
          height={400}
          data={userCountDv}
          scale={{
            Date: { type: 'time' },
            userCount: { type: 'linear' },
          }}
          padding={[60, 140]}
          forceFit>
          <Axis name="Date" />
          <Axis name="userCount" title={{}} />
          <Tooltip />
          <Legend position="right" />
          <Geom type="line" position="Date*userCount" size={2} color="key" />
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
            padding={[60, 140]}
          />
        </div>
      </div>
    );
  }
}
