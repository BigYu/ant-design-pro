import React from 'react';
import { Row, Col, Card } from 'antd';
import { Chart, Tooltip, Geom, Legend, Axis } from 'bizcharts';
import DataSet from '@antv/data-set';
import Slider from 'bizcharts-plugin-slider';
import numeral from 'numeral';
import autoHeight from '../autoHeight';

@autoHeight()
export default class TrendChartByWeather extends React.Component {
  constructor(props) {
    super(props);

    this.onRevenueSliderChange = this.onRevenueSliderChange.bind(this);
    this.onUserCountSliderChange = this.onUserCountSliderChange.bind(this);
  }

  onRevenueSliderChange({ startValue, endValue }) {
    this.dsRevenue.setState('start', new Date(startValue).getTime());
    this.dsRevenue.setState('end', new Date(endValue).getTime());
  }

  onUserCountSliderChange({ startValue, endValue }) {
    this.dsUserCount.setState('start', new Date(startValue).getTime());
    this.dsUserCount.setState('end', new Date(endValue).getTime());
  }

  render() {
    const {
      data = [],
    } = this.props;

    if (data.length === 0) return null;

    const endDate = new Date(data[data.length - 1].Date);
    const defaultStartDate = new Date(data[0].Date);
    this.dsRevenue = new DataSet({
      state: {
        start: defaultStartDate.getTime(),
        end: endDate.getTime(),
      },
    });
    this.dsUserCount = new DataSet({
      state: {
        start: defaultStartDate.getTime(),
        end: endDate.getTime(),
      },
    });

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
      })
      .transform({
        type: 'filter',
        callback(obj) {
          const time = new Date(obj.Date).getTime(); // !注意：时间格式，建议转换为时间戳进行比较
          return time >= dsRevenue.state.start && time <= dsRevenue.state.end;
        },
      });

    const userCountDv = this.dsUserCount.createView()
      .source(data)
      .transform({
        type: 'fold',
        key: 'key',
        value: 'userCount',
        fields: ['UserCount', 'AvgUserCount']
      })
      .transform({
        type: 'filter',
        callback(obj) {
          const time = new Date(obj.Date).getTime(); // !注意：时间格式，建议转换为时间戳进行比较
          return time >= dsUserCount.state.start && time <= dsUserCount.state.end;
        },
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
            <div>
              <Slider
                width='auto'
                height={26}
                start={this.dsRevenue.state.start}
                end={this.dsRevenue.state.end}
                xAxis="Date"
                yAxis="value"
                scales={{Date:{type: 'time',tickCount: 10, mask:'M/DD' }}}
                data={originDvRevenue}
                backgroundChart={{type: 'line'}}
                onChange={this.onRevenueSliderChange}
                padding={[60, 140]}
              />
            </div>
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
            <div>
              <Slider
                width='auto'
                height={26}
                start={this.dsUserCount.state.start}
                end={this.dsUserCount.state.end}
                xAxis="Date"
                yAxis="value"
                scales={{Date:{type: 'time',tickCount: 10, mask:'M/DD' }}}
                data={originDvUserCount}
                backgroundChart={{type: 'line'}}
                onChange={this.onUserCountSliderChange}
                padding={[60, 140]}
              />
            </div>
          </Card>
        </Col>
      </Row>
    );
  }
}
