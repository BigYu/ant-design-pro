import React from 'react';
import { Row, Col, Card } from 'antd';
import { Chart, Tooltip, Geom, Legend, Axis } from 'bizcharts';
import DataSet from '@antv/data-set';
import numeral from 'numeral';
import autoHeight from '../autoHeight';
import HolidayCard from './holidayCard';

function isWorkdayData(item) {
  const date = new Date(item.Date);
  const day = date.getDay();
  return day !== 0 && day !== 6;
}

@autoHeight()
export default class TrendChartByWeather extends React.Component {
  render() {
    const {
      data = [],
    } = this.props;

    if (data.length === 0) return null;

    // https://alibaba.github.io/BizCharts/demo-detail.html?code=demo/other/rain-and-flow
    // comparing with Wheather? PM25 & Temprature
    return (
      <Row gutter={12}>
        <Col xs={12}>
          <HolidayCard
            className={this.props.styles.offlineCard}
            title={this.props.titleRevenue}
            bordered={false}
            bodyStyle={{ padding: '0', marginTop: 16 }}
            style={{ marginBottom: 24 }}
            styles={this.props.styles}
            data={data}
            field="Revenue"
            max={120000}
            alias="营业额"
          />
        </Col>
        <Col xs={12}>
          <HolidayCard
            className={this.props.styles.offlineCard}
            title={this.props.titleUserCount}
            bordered={false}
            bodyStyle={{ padding: '0', marginTop: 16 }}
            style={{ marginBottom: 24 }}
            styles={this.props.styles}
            data={data}
            field="UserCount"
            max={3000}
            alias="顾客人数"
          />
        </Col>
      </Row>
    );
  }
}
