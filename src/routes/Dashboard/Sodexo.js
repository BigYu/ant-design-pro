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
import TopSKUChart from '../../components/Charts/TopSKUChart';
import OnDimensionChart from '../../components/Charts/RevenueOnDimension';
import TrendByDimension from '../../components/Charts/TrendChart/byDimension';
import TrendByOneDimension from '../../components/Charts/TrendChart/byOneDimension';
import TrendByTwoDimension from '../../components/Charts/TrendChart/byTwoDimension';
import TrendByThreeDimension from '../../components/Charts/TrendChart/byThreeDimension';
import TrendHoliday from '../../components/Charts/TrendChart/holiday';

import styles from './Analysis.less';

@connect(({ sodexo, loading }) => ({
    sodexo,
    // loading: loading.effects['sodexo/fetchTrend'],
}))
export default class SodexoDashboard extends React.PureComponent {
  componentDidMount() {
    this.props.dispatch({
      type: 'sodexo/fetchData',
    });
  }

  render() {
    const { sodexo, loading } = this.props;

    const topColResponsiveProps = {
      xs: 24,
      sm: 12,
      md: 12,
      lg: 12,
      xl: 6,
      style: { marginBottom: 24 },
    };

    const largeChartColResponsiveProps = {
      xs: 24,
      sm: 24,
      md: 24,
      lg: 12,
      xl: 12,
      style: { marginBottom: 24 },
    };

    return (
      <div>
        <Row>
          <Col {...largeChartColResponsiveProps}>
            <Card
              loading={loading}
              className={styles.offlineCard}
              title="Revenue Daily"
              bordered={false}
              bodyStyle={{ padding: '0', marginTop: 16 }}
              style={{ marginBottom: 24 }}
            >
              <TrendByDimension
                data={sodexo.data.RevenueUserCountTrendOnBranchCardTypeDinningPeriod.slice()}
                valueField="Revenue"
              />
            </Card>
          </Col>
          <Col {...largeChartColResponsiveProps}>
            <Card
              loading={loading}
              className={styles.offlineCard}
              title="UserCount Daily"
              bordered={false}
              bodyStyle={{ padding: '0', marginTop: 16 }}
              style={{ marginBottom: 24 }}
            >
              <TrendByDimension
                data={sodexo.data.RevenueUserCountTrendOnBranchCardTypeDinningPeriod.slice()}
                valueField="UserCount"
              />
            </Card>
          </Col>
        </Row>
        <Card
          loading={loading}
          className={styles.offlineCard}
          title="Last Month Revenue, UserCount: Daily, by DinningPeriod, by CardType, by Branch"
          bordered={false}
          bodyStyle={{ padding: '0', marginTop: 16 }}
          style={{ marginBottom: 24 }}
        >
          <div style={{ padding: '0' }}>
            <Row gutter={24}>
              <Col {...topColResponsiveProps}>
                <OnDimensionChart
                  data={sodexo.data.LastMonthRevenueOnDinningPeriod}
                  dimension="DinningPeriod"
                />
              </Col>
              <Col {...topColResponsiveProps}>
                <OnDimensionChart
                  data={sodexo.data.LastMonthRevenueOnCardType}
                  dimension="CardType"
                />
              </Col>
              <Col {...topColResponsiveProps}>
                <OnDimensionChart
                  data={sodexo.data.LastMonthRevenueOnBranch}
                  dimension="Branch"
                />
              </Col>
            </Row>
          </div>
        </Card>
        <Card
          loading={loading}
          className={styles.offlineCard}
          title="Last Year Revenue, UserCount: Daily, by DinningPeriod, by CardType, by Branch"
          bordered={false}
          bodyStyle={{ padding: '0', marginTop: 16 }}
          style={{ marginBottom: 24 }}
        >
          <div style={{ padding: '0' }}>
            <Row gutter={24}>
              <Col {...topColResponsiveProps}>
                <OnDimensionChart
                  data={sodexo.data.LastYearRevenueOnDinningPeriod}
                  dimension="DinningPeriod"
                />
              </Col>
              <Col {...topColResponsiveProps}>
                <OnDimensionChart
                  data={sodexo.data.LastYearRevenueOnCardType}
                  dimension="CardType"
                />
              </Col>
              <Col {...topColResponsiveProps}>
                <OnDimensionChart
                  data={sodexo.data.LastYearRevenueOnBranch}
                  dimension="Branch"
                />
              </Col>
            </Row>
          </div>
        </Card>
        <Card
          loading={loading}
          className={styles.offlineCard}
          title="SKU: Top popular SKU last month and last year"
          bordered={false}
          bodyStyle={{ padding: '0', marginTop: 16 }}
          style={{ marginBottom: 24 }}
        >
          <div style={{ padding: '0' }}>
            <Row>
              <Col {...topColResponsiveProps} xl={12}>
                <TopSKUChart
                  data={sodexo.data.LastMonthTopSKU}
                />
              </Col>
              <Col {...topColResponsiveProps} xl={12}>
                <TopSKUChart
                  data={sodexo.data.LastYearTopSKU}
                />
              </Col>
            </Row>
          </div>
        </Card>
        <Card
          loading={loading}
          className={styles.offlineCard}
          title="Chinese new year"
          bordered={false}
          bodyStyle={{ padding: '0', marginTop: 16 }}
          style={{ marginBottom: 24 }}
        >
          <div style={{ padding: '0' }}>
            <TrendHoliday
              data={sodexo.data.NearChineseNewYearAnalyse.slice()}
            />
          </div>
        </Card>
        <Card
          loading={loading}
          className={styles.offlineCard}
          title="National day"
          bordered={false}
          bodyStyle={{ padding: '0', marginTop: 16 }}
          style={{ marginBottom: 24 }}
        >
          <div style={{ padding: '0' }}>
            <TrendHoliday
              data={sodexo.data.NearNationalHolidayAnalyse.slice()}
            />
          </div>
        </Card>
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
              data={sodexo.data.DailyRevenueUserCountWeatherTrend.slice()}
            />
          </div>
        </Card>
      </div>
    );
  }
}
