import React from 'react';
import DataSet from '@antv/data-set';
import { Card, Radio } from 'antd';
import { Chart, Axis, Geom, Tooltip, Coord, Legend, Label } from 'bizcharts';
import autoHeight from '../autoHeight';

@autoHeight()
export default class RevenueByBranch extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      dinninePeriod: '全部',
      cardType: '全部',
      scope: '过去一年',
    };

    this.handleDinningPeriodChange = this.handleDinningPeriodChange.bind(this);
    this.handleCardTypeChange = this.handleCardTypeChange.bind(this);
    this.handleScopeChange = this.handleScopeChange.bind(this);
  }

  handleDinningPeriodChange(e) {
    this.setState({ dinninePeriod: e.target.value });
  }

  handleCardTypeChange(e) {
    this.setState({ cardType: e.target.value });
  }

  handleScopeChange(e) {
    this.setState({ scope: e.target.value });
  }

  render() {
    const { data, cardProps } = this.props;
    const { Revenue } = data;
    const ds = new DataSet();
    const dimension = 'Branch';
    const dv = ds.createView().source(Revenue || []).transform({
      type: 'map',
      callback({ Revenue, Dimension }) {
        return {
          Revenue: Number(Revenue),
          [dimension]: JSON.parse(Dimension)[dimension],
        };
      },
    });

    const extra = (
      <div>
        <Radio.Group value={this.state.dinninePeriod} onChange={this.handleDinningPeriodChange}>
          <Radio.Button value="全部">全部</Radio.Button>
          <Radio.Button value="早餐">早餐</Radio.Button>
          <Radio.Button value="午餐">午餐</Radio.Button>
          <Radio.Button value="晚餐">晚餐</Radio.Button>
        </Radio.Group>
        <Radio.Group value={this.state.cardType} onChange={this.handleCardTypeChange} style={{ marginLeft: 30 }}>
          <Radio.Button value="全部">全部</Radio.Button>
          <Radio.Button value="员工卡">员工卡</Radio.Button>
          <Radio.Button value="访客卡">访客卡</Radio.Button>
        </Radio.Group>
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
        <Chart height={400} data={dv}>
          <Coord type="theta" radius={0.75} innerRadius={0.6} />
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
            style={{ lineWidth: 1, stroke: '#fff' }}
          >
            <Label
              content={dimension}
              formatter={(val, item) => {
                return `${val}: ${item.point.Revenue}`;
              }}
            />
          </Geom>
        </Chart>
      </Card>
    );
  }
}
