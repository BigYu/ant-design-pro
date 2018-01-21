import React from 'react';
import DataSet from '@antv/data-set';
import { Chart, Axis, Geom, Tooltip, Coord, Legend, Label } from 'bizcharts';
import autoHeight from '../autoHeight';

@autoHeight()
export default class OnDimensionChart extends React.Component {
  render() {
    const { data, dimension } = this.props;
    const { Revenue } = data;
    const ds = new DataSet();
    const dv = ds.createView().source(Revenue || []).transform({
      type: 'map',
      callback({ Revenue, Dimension }) {
        return {
          Revenue: Number(Revenue),
          [dimension]: JSON.parse(Dimension)[dimension],
        };
      },
    });

    return (
      <Chart height={400} data={dv} forceFit>
        <Coord type="theta" radius={0.75} />
        <Axis name={dimension} />
        <Legend />
        <Tooltip
          showTitle={false}
          itemTpl='<li><span style="background-color:{color};" class="g2-tooltip-marker"></span>{name}: {value}</li>'
          />
        <Geom
          type="intervalStack"
          position="Revenue"
          color={dimension}
          style={{lineWidth: 1,stroke: '#fff'}}
          >
          <Label content={dimension} formatter={(val, item) => {
            return `${val}: ${item.point.Revenue}`;
          }} />
        </Geom>
      </Chart>
    );
  }
}