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

import d$Trend from './data/Trend';
import d$SKU from './data/Top';

@connect(({ chart, loading }) => ({
  chart,
  loading: loading.effects['chart/fetch'],
}))
export default class SodexoDashboard extends React.PureComponent {
  state = {
    salesType: 'all',
    currentTabKey: '',
  };

  componentDidMount() {
    this.props.dispatch({
      type: 'chart/fetch',
    });
  }

  componentWillUnmount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'chart/clear',
    });
  }

  render() {
    const { chart, loading } = this.props;

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
          <div style={{ padding: '0 24px' }}>
            <TrendChart
              data={d$Trend}
            />
          </div>
        </Card>
      </div>
    );
  }
}
