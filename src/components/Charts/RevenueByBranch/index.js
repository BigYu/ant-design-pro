import React from 'react';
import _ from 'lodash';
import DataSet from '@antv/data-set';
import { Card, Radio } from 'antd';
import { Chart, Axis, Geom, Tooltip, Coord, Legend, Label, Guide } from 'bizcharts';
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
    const { dataLastMonth, dataLastYear, cardProps } = this.props;
    const ds = new DataSet();
    const data = this.state.scope === '过去一年' ? dataLastYear : dataLastMonth;
    const { Revenue: RevenueData } = data;

    const dimension = 'Branch';

    const dataSource = _.chain(RevenueData || [])
      .map(({ Revenue, Dimension }) => {
        return _.defaults({}, JSON.parse(Dimension), { Revenue });
      })
      .filter((row) => {
        return (
          (row.CardType === this.state.cardType || this.state.cardType === '全部') &&
          (row.DinningPeriod === this.state.dinninePeriod || this.state.dinninePeriod === '全部')
        );
      })
      .groupBy(row => row.Branch)
      .map((row, key) => ({
        Branch: key,
        Revenue: _.reduce(row, (memo, cur) => memo + Number(cur.Revenue), 0),
      }))
      .filter(row => row.Revenue > 0)
      .value();

    const total = _.reduce(dataSource, (memo, cur) => memo + cur.Revenue, 0);

    const dv = ds.createView().source(_.isArray(dataSource) ? dataSource : []).transform({
      type: 'percent',
      field: 'Revenue',
      dimension: 'Branch',
      as: 'percent'
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
        <Chart
          height={400}
          data={dv}
          forceFit
        >
          <Coord type="theta" radius={0.75} innerRadius={0.6} />
          <Axis name={dimension} />
          <Legend position="right" offsetY={-50} offsetX={-400} />
          <Tooltip
            showTitle={false}
            itemTpl='<li><span style="background-color:{color};" class="g2-tooltip-marker"></span>{name}: {value}</li>'
          />
          <Guide >
            <Guide.Html
              position={['50%', '50%']}
              html={`<div style="color:#8c8c8c;font-size:1.16em;text-align: center;width: 10em;">营业额<br><span style="color:#262626;font-size:1.5em">${total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</span></div>`}
              alignX="middle"
              alignY="middle"
            />
          </Guide>
          <Geom
            type="intervalStack"
            position="Revenue"
            color={dimension}
            style={{ lineWidth: 1, stroke: '#fff' }}
          >
            <Label
              content={dimension}
              formatter={(val, item) => {
                return `${val}: ${('0' + item.point.Revenue).slice(-2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')} (${Math.round(item.point.percent * 100)}%)`;
              }}
            />
          </Geom>
        </Chart>
      </Card>
    );
  }
}
