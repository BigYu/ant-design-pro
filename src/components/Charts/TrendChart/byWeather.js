import React from 'react';
import { Chart, Tooltip, Geom, Legend, Axis } from 'bizcharts';
import DataSet from '@antv/data-set';
import Slider from 'bizcharts-plugin-slider';
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
        fields: [ 'Revenue', 'UserCount', 'WeatherPM25', 'WeatherAvgTemperature' ],
        key: 'type',
        value: 'value',
        retains: [ 'Revenue', 'UserCount', 'WeatherPM25', 'WeatherAvgTemperature', 'Date' ]
      });

    const chartDv = ds.createView();
    chartDv.source(data)
      .transform({
        type: 'fold',
        fields: [ 'Revenue', 'UserCount', 'WeatherPM25', 'WeatherAvgTemperature' ],
        key: 'type',
        value: 'value',
        retains: [ 'Revenue', 'UserCount', 'WeatherPM25', 'WeatherAvgTemperature', 'Date' ]
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
          scale={{
            Date: { type: 'time' },
            UserCount: { type: 'linear', alias: 'User Count' },
            Revenue: { type: 'linear'},
            WeatherPM25: { type: 'linear', alias: 'PM2.5' },
            WeatherAvgTemperature: { type: 'linear', alias: 'Temperature'},
          }}
          padding={[60, 140]}
          forceFit>
          <Axis name="Date" />
          <Axis name="Revenue" title={{}} label={{ offset: 60, autoRotate: false }} title={{ offset: 100 }}/>
          <Axis name="UserCount" title={{}} position='left' label={{ offset: 30, autoRotate: false }} title={{ offset: 20 }}/>
          <Axis name="WeatherPM25" title={{}} label={{ offset: 60, autoRotate: false }} title={{ offset: 90 }}/>
          <Axis name="WeatherAvgTemperature" title={{}} label={{ offset: 30, autoRotate: false }} title={{ offset: 20 }}/>
          <Tooltip />
          <Legend />
          <Geom type="line" position="Date*Revenue" size={2} color="Revenue" />
          <Geom type="line" position="Date*UserCount" size={2} color="UserCount" />
          <Geom type="line" position="Date*WeatherPM25" size={2} color="WeatherPM25" />
          <Geom type="line" position="Date*WeatherAvgTemperature" size={2} color="WeatherAvgTemperature" />
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
