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
import { setTheme } from 'bizcharts';
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
    const colors = ['#4472c4ff', '#ed7d31ff', '#a5a5a5ff', '#ffc000ff', '#5b9bd5ff', '#70ad47ff', '#264478ff', '#636363ff'];
    const colors16 = [...colors, '255e91ff', '#9e480eff', '#997300ff', '#43682bff'];

    setTheme({
      colors,
      colors_pie: colors,
      colors_pie_16: colors16,
    });

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
        <Row gutter={12}>
          <Col xs={12}>
            <Card
              loading={loading}
              className={styles.offlineCard}
              title="日营业额趋势图"
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
          <Col xs={12}>
            <Card
              loading={loading}
              className={styles.offlineCard}
              title="客户数量趋势图"
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
        <Row gutter={12}>
          <Col {...topColResponsiveProps} xl={8}>
            <Card
              loading={loading}
              className={styles.offlineCard}
              title="上个月不同时段营业额的对比图"
              bordered={false}
              bodyStyle={{ padding: '0', marginTop: 16 }}
              style={{ marginBottom: 24 }}
            >
              <OnDimensionChart
                data={sodexo.data.LastMonthRevenueOnDinningPeriod}
                dimension="DinningPeriod"
              />
            </Card>
          </Col>
          <Col {...topColResponsiveProps} xl={8}>
            <Card
              loading={loading}
              className={styles.offlineCard}
              title="上个月员工卡和访客卡营业额的对比图"
              bordered={false}
              bodyStyle={{ padding: '0', marginTop: 16 }}
              style={{ marginBottom: 24 }}
            >
              <OnDimensionChart
                data={sodexo.data.LastMonthRevenueOnCardType}
                dimension="CardType"
              />
            </Card>
          </Col>
          <Col {...topColResponsiveProps} xl={8}>
            <Card
              loading={loading}
              className={styles.offlineCard}
              title="上个月不同餐厅营业额的对比图"
              bordered={false}
              bodyStyle={{ padding: '0', marginTop: 16 }}
              style={{ marginBottom: 24 }}
            >
              <OnDimensionChart
                data={sodexo.data.LastMonthRevenueOnBranch}
                dimension="Branch"
              />
            </Card>
          </Col>
        </Row>
        <Row gutter={12}>
          <Col {...topColResponsiveProps} xl={8}>
            <Card
              loading={loading}
              className={styles.offlineCard}
              title="2017年不同时段营业额的对比图"
              bordered={false}
              bodyStyle={{ padding: '0', marginTop: 16 }}
              style={{ marginBottom: 24 }}
            >
              <OnDimensionChart
                data={sodexo.data.LastYearRevenueOnDinningPeriod}
                dimension="DinningPeriod"
              />
            </Card>
          </Col>
          <Col {...topColResponsiveProps} xl={8}>
            <Card
              loading={loading}
              className={styles.offlineCard}
              title="2017年员工卡和访客卡营业额的对比图"
              bordered={false}
              bodyStyle={{ padding: '0', marginTop: 16 }}
              style={{ marginBottom: 24 }}
            >
              <OnDimensionChart
                data={sodexo.data.LastYearRevenueOnCardType}
                dimension="CardType"
              />
            </Card>
          </Col>
          <Col {...topColResponsiveProps} xl={8}>
            <Card
              loading={loading}
              className={styles.offlineCard}
              title="2017年不同餐厅营业额的对比图"
              bordered={false}
              bodyStyle={{ padding: '0', marginTop: 16 }}
              style={{ marginBottom: 24 }}
            >
              <OnDimensionChart
                data={sodexo.data.LastYearRevenueOnBranch}
                dimension="Branch"
              />
            </Card>
          </Col>
        </Row>
        <Row gutter={12}>
          <Col xs={12}>
            <Card
              loading={loading}
              className={styles.offlineCard}
              title="上个月最受欢迎菜品营业额对比图"
              bordered={false}
              bodyStyle={{ padding: '0', marginTop: 16 }}
              style={{ marginBottom: 24 }}
            >
              <TopSKUChart
                data={sodexo.data.LastMonthTopSKU}
              />
            </Card>
          </Col>
          <Col xs={12}>
            <Card
              loading={loading}
              className={styles.offlineCard}
              title="2017年最受欢迎菜品营业额对比图"
              bordered={false}
              bodyStyle={{ padding: '0', marginTop: 16 }}
              style={{ marginBottom: 24 }}
            >
              <TopSKUChart
                data={sodexo.data.LastYearTopSKU}
              />
            </Card>
          </Col>
        </Row>
        <TrendHoliday
          styles={styles}
          titleRevenue="国庆节前后两周日营业额趋势图"
          titleUserCount="国庆节前后两周日客户数量趋势图"
          data={sodexo.data.NearNationalHolidayAnalyse.slice()}
        />
        <TrendHoliday
          styles={styles}
          titleRevenue="春节前后两周日营业额趋势图"
          titleUserCount="春节前后两周日客户数量趋势图"
          data={sodexo.data.NearChineseNewYearAnalyse.slice()}
        />
        <Card
          loading={loading}
          className={styles.offlineCard}
          title="Weather, Revenue, UserCount: day by day"
          bordered={false}
          bodyStyle={{ padding: '0', marginTop: 16 }}
          style={{ marginBottom: 24 }}
        >
          <div style={{ padding: '0' }}>
            <Row type='flex' justify='center'>
              <h3 style={{ marginLeft: 24 }}>日营业额，客户数量和天气情况的趋势图</h3>
            </Row>
            <TrendChartByWeather
              data={sodexo.data.DailyRevenueUserCountWeatherTrend.slice()}
            />
          </div>
        </Card>
      </div>
    );
  }
}
