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
              <Row type='flex' justify='center'>
                <h3 style={{ marginLeft: 24 }}>日营业额趋势图</h3>
              </Row>
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
              <Row type='flex' justify='center'>
                <h3 style={{ marginLeft: 24 }}>客户数量趋势图</h3>
              </Row>
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
                <Row type='flex' justify='center'>
                  <h3 style={{ marginLeft: 24 }}>上个月不同时段营业额的对比图</h3>
                </Row>
                <OnDimensionChart
                  data={sodexo.data.LastMonthRevenueOnDinningPeriod}
                  dimension="DinningPeriod"
                />
              </Col>
              <Col {...topColResponsiveProps}>
                <Row type='flex' justify='center'>
                  <h3 style={{ marginLeft: 24 }}>上个月不同时段营业额的对比图</h3>
                </Row>
                <OnDimensionChart
                  data={sodexo.data.LastMonthRevenueOnCardType}
                  dimension="CardType"
                />
              </Col>
              <Col {...topColResponsiveProps}>
                <Row type='flex' justify='center'>
                  <h3 style={{ marginLeft: 24 }}>上个月不同时段营业额的对比图</h3>
                </Row>
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
                <Row type='flex' justify='center'>
                  <h3 style={{ marginLeft: 24 }}>2017年不同时段营业额的对比图</h3>
                </Row>
                <OnDimensionChart
                  data={sodexo.data.LastYearRevenueOnDinningPeriod}
                  dimension="DinningPeriod"
                />
              </Col>
              <Col {...topColResponsiveProps}>
                <Row type='flex' justify='center'>
                  <h3 style={{ marginLeft: 24 }}>2017年员工卡和访客卡营业额的对比图</h3>
                </Row>
                <OnDimensionChart
                  data={sodexo.data.LastYearRevenueOnCardType}
                  dimension="CardType"
                />
              </Col>
              <Col {...topColResponsiveProps}>
                <Row type='flex' justify='center'>
                  <h3 style={{ marginLeft: 24 }}>2017年不同餐厅营业额的对比图</h3>
                </Row>
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
                <Row type='flex' justify='center'>
                  <h3 style={{ marginLeft: 24 }}>上个月最受欢迎菜品营业额对比图</h3>
                </Row>
                <TopSKUChart
                  data={sodexo.data.LastMonthTopSKU}
                />
              </Col>
              <Col {...topColResponsiveProps} xl={12}>
                <Row type='flex' justify='center'>
                  <h3 style={{ marginLeft: 24 }}>2017年最受欢迎菜品营业额对比图</h3>
                </Row>
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
          title="Near National Holiday analyse"
          bordered={false}
          bodyStyle={{ padding: '0', marginTop: 16 }}
          style={{ marginBottom: 24 }}
        >
          <div style={{ padding: '0' }}>
            <Row type='flex' justify='center'>
              <h3 style={{ marginLeft: 24 }}>国庆节前后两周日营业额和客户数量趋势图</h3>
            </Row>
            <TrendHoliday
              data={sodexo.data.NearNationalHolidayAnalyse.slice()}
            />
          </div>
        </Card>
        <Card
          loading={loading}
          className={styles.offlineCard}
          title="Near Chinese New Year analyse"
          bordered={false}
          bodyStyle={{ padding: '0', marginTop: 16 }}
          style={{ marginBottom: 24 }}
        >
          <div style={{ padding: '0' }}>
            <Row type='flex' justify='center'>
              <h3 style={{ marginLeft: 24 }}>春节前后两周日营业额和客户数量趋势图</h3>
            </Row>
            <TrendHoliday
              data={sodexo.data.NearChineseNewYearAnalyse.slice()}
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
