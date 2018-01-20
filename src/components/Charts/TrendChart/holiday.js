import React from 'react';
import { Row, Col, Card } from 'antd';
import { Chart, Tooltip, Geom, Legend, Axis } from 'bizcharts';
import DataSet from '@antv/data-set';
import numeral from 'numeral';
import autoHeight from '../autoHeight';

@autoHeight()
export default class TrendChartByWeather extends React.Component {
  render() {
    const {
      data = [],
    } = this.props;

    if (data.length === 0) return null;

    this.dsRevenue = new DataSet();
    this.dsUserCount = new DataSet();

    const { dsRevenue, dsUserCount } = this;

    const originDvRevenue = this.dsRevenue.createView('origin').source(data);
    const originDvUserCount = this.dsUserCount.createView('origin').source(data);

    const revenueDv = this.dsRevenue.createView()
      .source(data)
      .transform({
        type: 'fold',
        key: 'key',
        value: 'revenue',
        fields: ['Revenue', 'AvgRevenue']
      });

    const userCountDv = this.dsUserCount.createView()
      .source(data)
      .transform({
        type: 'fold',
        key: 'key',
        value: 'userCount',
        fields: ['UserCount', 'AvgUserCount']
      });

    // https://alibaba.github.io/BizCharts/demo-detail.html?code=demo/other/rain-and-flow
    // comparing with Wheather? PM25 & Temprature
    return (
      <Row gutter={12}>
        <Col xs={12}>
          <Card
            className={this.props.styles.offlineCard}
            title={this.props.titleRevenue}
            bordered={false}
            bodyStyle={{ padding: '0', marginTop: 16 }}
            style={{ marginBottom: 24 }}
          >
            <Chart
              height={400}
              data={revenueDv}
              scale={{
                Date: { type: 'time' },
                revenue: { type: 'linear' },
              }}
              padding={[60, 140]}
              forceFit
            >
              <Axis name="Date" />
              <Axis name="revenue" title={{}} label={{formatter: val => numeral(val).format('0,0')}} />
              <Tooltip />
              <Legend position="right" />
              <Geom type="line" position="Date*revenue" size={2} color="key" />
            </Chart>
          </Card>
        </Col>
        <Col xs={12}>
          <Card
            className={this.props.styles.offlineCard}
            title={this.props.titleUserCount}
            bordered={false}
            bodyStyle={{ padding: '0', marginTop: 16 }}
            style={{ marginBottom: 24 }}
          >
            <Chart
              height={400}
              data={userCountDv}
              scale={{
                Date: { type: 'time' },
                userCount: { type: 'linear' },
              }}
              padding={[60, 140]}
              forceFit
            >
              <Axis name="Date" />
              <Axis name="userCount" title={{}} />
              <Tooltip />
              <Legend position="right" />
              <Geom type="line" position="Date*userCount" size={2} color="key" />
            </Chart>
          </Card>
        </Col>
      </Row>
    );
  }
}
