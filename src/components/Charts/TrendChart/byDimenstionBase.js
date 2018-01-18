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
      reducer,
      fields,
      valueField,
    } = this.props;

    if (data.length === 0) return null;

    data.sort((item1, item2) => new Date(item1.Date) - new Date(item2.Date));
    const endDate = new Date(data[data.length - 1].Date);
    const defaultStartDate = new Date(endDate.getFullYear(), endDate.getMonth(), 1);
    const ds = this.ds = new DataSet({
      state: {
        start: defaultStartDate.getTime(),
        end: endDate.getTime()
      }
    });
    const originDv = ds.createView('origin');


    originDv.source(data.slice())
      .transform({
        type: 'map',
        callback: reducer,
      })
      .transform({
        type: 'fold',
        fields,
        key: 'key',
        value: 'value',
      });

    const chartDv = ds.createView();

    chartDv.source(data)
      .transform({
        type: 'map',
        callback: reducer,
      })
      .transform({
        type: 'fold',
        fields,
        key: 'key',
        value: 'value',
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
          data={chartDv}
          padding={[60, 140]}
          scale={{
            Date: { type: 'time' },
            value: { alias: valueField },
          }}
          forceFit>
          <Axis name="Date" />
          <Axis name="value" title={{}} label={{formatter: val => numeral(val).format('0,0')}} />
          <Tooltip />
          <Legend position="right" />
          <Geom type="areaStack" position="Date*value" size={2} color="key" />
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
