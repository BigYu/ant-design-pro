import React from 'react';
import { Row, Col, Card, Switch } from 'antd';
import { Chart, Tooltip, Geom, Legend, Axis } from 'bizcharts';
import DataSet from '@antv/data-set';
import numeral from 'numeral';
import autoHeight from '../autoHeight';

function isWorkdayData(item) {
  const date = new Date(item.Date);
  const day = date.getDay();
  return day !== 0 && day !== 6;
}

@autoHeight()
export default class HolidayCard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      ignoreWeekend: true,
    };

    this.onChangeIgnoreWeekend = this.onChangeIgnoreWeekend.bind(this);
  }

  onChangeIgnoreWeekend(ignoreWeekend) {
    this.setState({
      ignoreWeekend,
    });
  }

  render() {
    const {
      data = [],
      field,
    } = this.props;

    if (data.length === 0) return null;

    const ds = this.ds = new DataSet();

    const originDv = this.ds.createView('origin').source(data);

    const chartDv = this.ds.createView()
      .source(data)
      .transform({
        type: 'fold',
        key: 'key',
        value: 'value',
        fields: [field, `Avg${field}`]
      });

      if (this.state.ignoreWeekend) {
        chartDv.transform({
          type: 'filter',
          callback: isWorkdayData
        })
      }

    // https://alibaba.github.io/BizCharts/demo-detail.html?code=demo/other/rain-and-flow
    // comparing with Wheather? PM25 & Temprature
    return (
      <Card
        className={this.props.styles.offlineCard}
        title={this.props.title}
        bordered={false}
        bodyStyle={{ padding: '0', marginTop: 16 }}
        style={{ marginBottom: 24 }}
      >
        <Row type='flex' justify='space-between' style={{ margin: '10px 60px' }}>
          <Switch
            checked={this.state.ignoreWeekend}
            onChange={this.onChangeIgnoreWeekend}
            checkedChildren={'忽略周末'}
            unCheckedChildren={'显示周末'}
          />
        </Row>
        <Chart
          height={400}
          data={chartDv}
          scale={{
            Date: { type: 'time' },
            value: { type: 'linear' },
          }}
          padding={[60, 140]}
          forceFit
        >
          <Axis name="Date" />
          <Axis name="value" title={{}} label={{formatter: val => numeral(val).format('0,0')}} />
          <Tooltip />
          <Legend position="right" />
          <Geom type="line" position="Date*value" size={2} color="key" />
        </Chart>
      </Card>
    );
  }
}
