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
import TrendChart from '../../components/Charts/TrendChart';

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
          title="Trend"
          bordered={false}
          bodyStyle={{ padding: '0 0 32px 0', marginTop: 16 }}
          style={{ marginBottom: 24 }}
        >
          <div style={{ padding: '24px' }}>
            <TrendChart
              data={sodexo.trend}
            />
          </div>
        </Card>
      </div>
    );
  }
}
