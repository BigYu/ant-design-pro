import React, { Component } from 'react';
import { connect } from 'dva';
import {
  Row,
  Col,
  Icon,
  Card,
  Table,
  Radio,
  Tooltip,
  Menu,
  Dropdown,
} from 'antd';
import TrendChartByWeather from '../../components/Charts/TrendChart/byWeather';

import styles from './Analysis.less';

@connect(({ sodexo, loading }) => ({
    sodexo,
    // loading: loading.effects['sodexo/fetchTrend'],
}))
export default class SodexoDashboard extends React.PureComponent {
  componentDidMount() {
    this.props.dispatch({
      type: 'sodexo/fetchDailyRevenueUserCountWeatherTrend',
    });
  }

  render() {
    const { sodexo, loading } = this.props;

    return (
      <div>
        <Card
          loading={loading}
          className={styles.offlineCard}
          title="Weather, Revenue, UserCount: day by day"
          bordered={false}
          bodyStyle={{ padding: '0', marginTop: 16 }}
          style={{ marginBottom: 24 }}
        >
          <div style={{ padding: '0' }}>
            <TrendChartByWeather
              data={sodexo.trendByWeather}
            />
          </div>
        </Card>
      </div>
    );
  }
}
