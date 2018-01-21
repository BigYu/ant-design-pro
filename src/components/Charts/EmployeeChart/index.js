import _ from 'lodash';
import React from 'react';
import { Card, Radio } from 'antd';
import { Chart, Axis, Geom, Tooltip, Coord, Legend, Label } from 'bizcharts';
import DataSet from '@antv/data-set';
import autoHeight from '../autoHeight';

@autoHeight()
export default class EmployeeChargeChart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      scope: '过去一年',
    };

    this.handleScopeChange = this.handleScopeChange.bind(this);
  }

  handleScopeChange(e) {
    this.setState({ scope: e.target.value });
  }

  render() {
    const { dataLastMonth, dataLastYear, cardProps } = this.props;
    const data = this.state.scope === '过去一年' ? dataLastYear : dataLastMonth;
    const userCountData = data.CardCharge;
    const ds = new DataSet();
    const dv = ds.createView().source(_.isArray(userCountData) ? userCountData : [])
      .transform({
        type: 'map',
        callback({ UserCount, Dimension }) {
          return {
            UserCount: Number(UserCount),
            Type: JSON.parse(Dimension).ChargeCard === '是' ? '冲过卡' : '未冲过卡',
          };
        },
      });

    const extra = (
      <div>
        <Radio.Group value={this.state.scope} onChange={this.handleScopeChange} style={{ marginLeft: 30 }}>
          <Radio.Button value="过去一年">过去一年</Radio.Button>
          <Radio.Button value="过去一个月">过去一个月</Radio.Button>
        </Radio.Group>
      </div>
    );

    return (
      <Card
        {...cardProps}
        extra={extra}
      >
        <Chart
          height={400}
          data={dv}
          forceFit
        >
          <Coord type="theta" radius={0.75} />
          <Axis name="Type" />
          <Legend />
          <Tooltip
            showTitle={false}
            itemTpl='<li><span style="background-color:{color};" class="g2-tooltip-marker"></span>{name}: {value}</li>'
          />
          <Geom
            type="intervalStack"
            position="UserCount"
            color="Type"
            style={{ lineWidth: 1, stroke: '#fff' }}
          >
            <Label
              content="Type"
              formatter={(val, item) => {
                return `${val}: ${item.point.UserCount}`;
              }}
            />
          </Geom>
        </Chart>
      </Card>
    );
  }
}
