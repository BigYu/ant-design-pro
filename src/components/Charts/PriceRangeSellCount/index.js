import React from 'react';
import { Chart, Tooltip, Geom, Legend, Axis, Coord, Label } from 'bizcharts';
import DataSet from '@antv/data-set';
import Slider from 'bizcharts-plugin-slider';
import autoHeight from '../autoHeight';

@autoHeight()
export default class PriceRangeSellCount extends React.Component {
  render() {
    const {
      data = [],
    } = this.props;

    const dv = new DataSet.DataView();
    dv.source(data)
      .transform({
        type: 'map',
        callback({ SellCount: { SellCount, Dimension } }) {
          const { PriceRange } = JSON.parse(Dimension);

          return {
            SellCount: Number(SellCount),
            PriceRange,
          }
        }
      })
    return (
      <Chart
        height={470}
        data={dv}
        padding={[ 100, 100 ]}
        forceFit>
        <Coord type='theta' radius={0.75} />
        <Axis name="SellCount" />
        <Legend position='bottom' offsetY={-40} />
        <Tooltip
          showTitle={false}
          itemTpl='<li><span style="background-color:{color};" class="g2-tooltip-marker"></span>{name}: {value}</li>'
          />
        <Geom
          type="intervalStack"
          position="SellCount"
          color='PriceRange'
          style={{lineWidth: 1,stroke: '#fff'}}
          >
          <Label content='SellCount' formatter={(val, item) => {
              return item.point.PriceRange + ': ' + val;}} />
        </Geom>
      </Chart>
    );
  }
}
