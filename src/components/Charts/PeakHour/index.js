import React from 'react';
import { Chart, Tooltip, Geom, Legend, Axis, Coord, Label } from 'bizcharts';
import DataSet from '@antv/data-set';
import Slider from 'bizcharts-plugin-slider';
import autoHeight from '../autoHeight';

@autoHeight()
export default class PeakHour extends React.Component {
  render() {
    const {
      data = [],
    } = this.props;

    const dv = new DataSet.DataView();
    dv.source(data)
      .transform({
        type: 'map',
        callback({ Time, UserCount: { UserCount } }) {
          return {
            UserCount: Number(UserCount),
            Time: new Date(`12/31/2017 ${Time.substr(0, Time.length - 3)}`),
          }
        }
      })
    return (
      <Chart
        height={400}
        data={dv}
        padding={[ 100, 100 ]}
        scale={{
          Time: { type: 'time', alias: '时间', mask: 'HH:mm', tickCount: 12 },
          UserCount: { type: 'linear', alias: '顾客数量' }
        }}
        forceFit>
        <Axis name="Time" />
        <Axis name="UserCount" />
        <Tooltip />
        <Geom
          type="line"
          position="Time*UserCount"
        />
        <Geom type="point" position={`Time*UserCount`} size={4} />
      </Chart>
    );
  }
}
