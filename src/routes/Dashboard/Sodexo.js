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

import styles from './Analysis.less';

import d$LastMonthTopSKU from '../../../data/LastMonthTopSKU';
import d$LastYearTopSKU from '../../../data/LastYearTopSKU';

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
              data={sodexo.data.DailyRevenueUserCountWeatherTrend.slice()}
            />
          </div>
        </Card>
        <Card
          loading={loading}
          className={styles.offlineCard}
          title="Last MonthRevenue, UserCount: Daily, by DinningPeriod, by CardType, by Branch"
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
        {/* <Card
          loading={loading}
          className={styles.offlineCard}
          title="Revenue, UserCount: Daily, by CardType"
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
        <Card
          loading={loading}
          className={styles.offlineCard}
          title="Revenue, UserCount: Daily, by Branch"
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
        <Card
          loading={loading}
          className={styles.offlineCard}
          title="Revenue, UserCount: Daily, by DinningPeriod-Branch"
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
        <Card
          loading={loading}
          className={styles.offlineCard}
          title="Revenue, UserCount: Daily, by DinningPeriod-CardType"
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
        <Card
          loading={loading}
          className={styles.offlineCard}
          title="Revenue, UserCount: Daily, by Branch-CardType"
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
        <Card
          loading={loading}
          className={styles.offlineCard}
          title="Revenue, UserCount: Daily, by DinningPeriod-Branch-CardType"
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
        <Card
          loading={loading}
          className={styles.offlineCard}
          title="SKU: Top popular SKU (pie chart) last month"
          bordered={false}
          bodyStyle={{ padding: '0', marginTop: 16 }}
          style={{ marginBottom: 24 }}
        >
          <div style={{ padding: '0' }}>
            <TopSKUChart
              data={d$LastMonthTopSKU}
            />
          </div>
        </Card>
        <Card
          loading={loading}
          className={styles.offlineCard}
          title="SKU: Top popular SKU (pie chart) last year"
          bordered={false}
          bodyStyle={{ padding: '0', marginTop: 16 }}
          style={{ marginBottom: 24 }}
        >
          <div style={{ padding: '0' }}>
            <TopSKUChart
              data={d$LastYearTopSKU}
            />
          </div>
        </Card>
        <Card
          loading={loading}
          className={styles.offlineCard}
          title="Revenue: By Branch, last monthly"
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
        <Card
          loading={loading}
          className={styles.offlineCard}
          title="Revenue: By Branch, last Yearly"
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
        <Card
          loading={loading}
          className={styles.offlineCard}
          title="Revenue: By Dinning Period, last monthly"
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
        <Card
          loading={loading}
          className={styles.offlineCard}
          title="Revenue: By Dinning Period, last Yearly"
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
        <Card
          loading={loading}
          className={styles.offlineCard}
          title="Revenue: By CradType, last monthly"
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
        <Card
          loading={loading}
          className={styles.offlineCard}
          title="Revenue: By CradType, last Yearly"
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
        <Card
          loading={loading}
          className={styles.offlineCard}
          title="SKU: Daily, day by day count"
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
        <Card
          loading={loading}
          className={styles.offlineCard}
          title="SKU: Weekly, Week over Week"
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
        <Card
          loading={loading}
          className={styles.offlineCard}
          title="SKU: Monthly, Month by Month"
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
        <Card
          loading={loading}
          className={styles.offlineCard}
          title="SKU: Daily, by CardType"
          bordered={false}
          bodyStyle={{ padding: '0', marginTop: 16 }}
          style={{ marginBottom: 24 }}
        >
          <div style={{ padding: '0' }}>
            <TrendChartByWeather
              data={sodexo.data.DailyRevenueUserCountWeatherTrend.slice()}
            />
          </div>
        </Card> */}
      </div>
    );
  }
}