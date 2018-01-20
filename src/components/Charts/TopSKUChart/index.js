import React from 'react';
import { Chart, Tooltip, Geom, Legend, Axis, Coord, Label } from 'bizcharts';
import DataSet from '@antv/data-set';
import Slider from 'bizcharts-plugin-slider';
import autoHeight from '../autoHeight';

@autoHeight()
export default class TopSKUChart extends React.Component {
  render() {
    const {
      data = {},
    } = this.props;

    if (!data.Revenue) return null;

    const dv = new DataSet.DataView();
    dv.source(data.Revenue)
      .transform({
        type: 'map',
        callback({ Revenue, Dimension }) {
          const { SKU } = JSON.parse(Dimension);

          return {
            Revenue: Number(Revenue),
            SKU,
          }
        }
      })
      // .transform({
      //   type: 'percent',
      //   field: 'Revenue',
      //   dimension: 'SKU',
      //   as: 'percent'
      // });
    const cols = {
      percent: {
        formatter: val => {
          val = (val * 100).toFixed(2) + '%';
          return val;
        }
      }
    }
    return (
      <Chart
        height={400}
        data={dv}
        scale={cols}
        padding={[ 80, 100, 80, 80 ]}
        forceFit>
        <Coord type='theta' radius={0.75} />
        <Axis name="Revenue" />
        <Legend position='bottom' offsetY={-20} />
        <Tooltip
          showTitle={false}
          itemTpl='<li><span style="background-color:{color};" class="g2-tooltip-marker"></span>{name}: {value}</li>'
          />
        <Geom
          type="intervalStack"
          position="Revenue"
          color='SKU'
          // tooltip={['SKU*percent',(SKU, percent) => {
          //   percent = percent * 100 + '%';
          //   return {
          //     name: SKU,
          //     value: percent
          //   };
          // }]}
          style={{lineWidth: 1,stroke: '#fff'}}
          >
          <Label content='Revenue' formatter={(val, item) => {
              return item.point.SKU + ': ' + val;}} />
        </Geom>
      </Chart>
    );
  }
}
