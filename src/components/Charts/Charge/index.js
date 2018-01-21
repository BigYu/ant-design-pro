import _ from 'lodash';
import React from 'react';
import { formatMoney } from 'accounting';
import { Card, Radio } from 'antd';
import { Chart, Axis, Geom, Tooltip, Coord, Legend, Label } from 'bizcharts';
import DataSet from '@antv/data-set';
import autoHeight from '../autoHeight';

@autoHeight()
export default class ChargeChart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      scope: '过去一年',
      type: '全部',
    };

    this.handleScopeChange = this.handleScopeChange.bind(this);
    this.handleTypeChange = this.handleTypeChange.bind(this);
  }

  handleScopeChange(e) {
    this.setState({ scope: e.target.value });
  }

  handleTypeChange(e) {
    this.setState({ type: e.target.value });
  }

  render() {
    const { dataLastMonth, dataLastYear, cardProps } = this.props;
    const data = this.state.scope === '过去一年' ? dataLastYear : dataLastMonth;
    const amountData = data.Amount;
    const ds = new DataSet();
    const { type } = this.state;
    const dv = ds.createView().source(_.isArray(amountData) ? amountData : [])
      .transform({
        type: 'map',
        callback(row) {
          return {
            amount: Number(type === '全部' ? row.TotalAmount : row.AverageAmount),
            CardType: JSON.parse(row.Dimension).CardType,
          };
        },
      });

    const extra = (
      <div>
        <Radio.Group value={this.state.type} onChange={this.handleTypeChange} >
          <Radio.Button value="全部">全部</Radio.Button>
          <Radio.Button value="平均">平均</Radio.Button>
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
          <Coord type="theta" radius={0.75} />
          <Axis name="CardType" />
          <Legend position="amount" offsetY={-50} offsetX={-400} />
          <Tooltip
            showTitle={false}
            itemTpl='<li><span style="background-color:{color};" class="g2-tooltip-marker"></span>{name}: {value}</li>'
          />
          <Geom
            type="intervalStack"
            position="amount"
            color="CardType"
            style={{ lineWidth: 1, stroke: '#fff' }}
          >
            <Label
              content="CardType"
              formatter={(val, item) => {
                return `${val}: ${(formatMoney(item.point.amount, { symbol: '￥' }))}`;
              }}
            />
          </Geom>
        </Chart>
      </Card>
    );
  }
}
