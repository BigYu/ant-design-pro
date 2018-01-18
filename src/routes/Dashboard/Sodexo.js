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
          title="Revenue, UserCount: Daily, by DinningPeriod"
          bordered={false}
          bodyStyle={{ padding: '0', marginTop: 16 }}
          style={{ marginBottom: 24 }}
        >
          <div style={{ padding: '0' }}>
            <TrendByOneDimension
              data={sodexo.data.RevenueUserCountTrendOnDinningPeriod.slice()}
              valueField="Revenue"
              dimensions={[{ dimension: "DinningPeriod", fields: ['早餐', '晚餐', '午餐'] }]}
            />
            <TrendByOneDimension
              data={sodexo.data.RevenueUserCountTrendOnDinningPeriod.slice()}
              valueField="UserCount"
              dimensions={[{ dimension: "DinningPeriod", fields: ['早餐', '晚餐', '午餐'] }]}
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
            <TrendByOneDimension
              data={sodexo.data.RevenueUserCountTrendOnBranch.slice()}
              valueField="Revenue"
              dimensions={[{ dimension: "Branch", fields: ['中餐厅', '自助餐厅', '粤菜餐厅', '微餐厅晚餐1', '员工餐厅'] }]}
            />
            <TrendByOneDimension
              data={sodexo.data.RevenueUserCountTrendOnBranch.slice()}
              valueField="UserCount"
              dimensions={[{ dimension: "Branch", fields: ['中餐厅', '自助餐厅', '粤菜餐厅', '微餐厅晚餐1', '员工餐厅'] }]}
            />
          </div>
        </Card>
        <Card
          loading={loading}
          className={styles.offlineCard}
          title="Revenue, UserCount: Daily, by CardType"
          bordered={false}
          bodyStyle={{ padding: '0', marginTop: 16 }}
          style={{ marginBottom: 24 }}
        >
          <div style={{ padding: '0' }}>
            <TrendByOneDimension
              data={sodexo.data.RevenueUserCountTrendOnCardType.slice()}
              valueField="Revenue"
              dimensions={[{ dimension: "CardType", fields: ['员工卡', '访客卡'] }]}
            />
            <TrendByOneDimension
              data={sodexo.data.RevenueUserCountTrendOnCardType.slice()}
              valueField="UserCount"
              dimensions={[{ dimension: "CardType", fields: ['员工卡', '访客卡'] }]}
            />
          </div>
        </Card>
        <Card
          loading={loading}
          className={styles.offlineCard}
          title="Revenue, UserCount: Daily, by Branch-DinningPeriod"
          bordered={false}
          bodyStyle={{ padding: '0', marginTop: 16 }}
          style={{ marginBottom: 24 }}
        >
          <div style={{ padding: '0' }}>
            <TrendByTwoDimension
              data={sodexo.data.RevenueUserCountTrendOnBranchDinningPeriod.slice()}
              valueField="Revenue"
              dimensions={[
                { dimension: "Branch", fields: ['中餐厅', '自助餐厅', '粤菜餐厅', '微餐厅晚餐1', '员工餐厅'] },
                { dimension: "DinningPeriod", fields: ['早餐', '晚餐', '午餐'] },
              ]}
            />
            <TrendByTwoDimension
              data={sodexo.data.RevenueUserCountTrendOnBranchDinningPeriod.slice()}
              valueField="UserCount"
              dimensions={[
                { dimension: "Branch", fields: ['中餐厅', '自助餐厅', '粤菜餐厅', '微餐厅晚餐1', '员工餐厅'] },
                { dimension: "DinningPeriod", fields: ['早餐', '晚餐', '午餐'] },
              ]}
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
            <TrendByTwoDimension
              data={sodexo.data.RevenueUserCountTrendOnBranchCardType.slice()}
              valueField="Revenue"
              dimensions={[
                { dimension: "Branch", fields: ['中餐厅', '自助餐厅', '粤菜餐厅', '微餐厅晚餐1', '员工餐厅'] },
                { dimension: "CardType", fields: ['员工卡', '访客卡'] },
              ]}
            />
            <TrendByTwoDimension
              data={sodexo.data.RevenueUserCountTrendOnBranchCardType.slice()}
              valueField="UserCount"
              dimensions={[
                { dimension: "Branch", fields: ['中餐厅', '自助餐厅', '粤菜餐厅', '微餐厅晚餐1', '员工餐厅'] },
                { dimension: "CardType", fields: ['员工卡', '访客卡'] },
              ]}
            />
          </div>
        </Card>
        <Card
          loading={loading}
          className={styles.offlineCard}
          title="Revenue, UserCount: Daily, by CardType-DinningPeriod"
          bordered={false}
          bodyStyle={{ padding: '0', marginTop: 16 }}
          style={{ marginBottom: 24 }}
        >
          <div style={{ padding: '0' }}>
            <TrendByTwoDimension
              data={sodexo.data.RevenueUserCountTrendOnCardTypeDinningPeriod.slice()}
              valueField="Revenue"
              dimensions={[
                { dimension: "CardType", fields: ['员工卡', '访客卡'] },
                { dimension: "DinningPeriod", fields: ['早餐', '晚餐', '午餐'] },
              ]}
            />
            <TrendByTwoDimension
              data={sodexo.data.RevenueUserCountTrendOnCardTypeDinningPeriod.slice()}
              valueField="UserCount"
              dimensions={[
                { dimension: "CardType", fields: ['员工卡', '访客卡'] },
                { dimension: "DinningPeriod", fields: ['早餐', '晚餐', '午餐'] },
              ]}
            />
          </div>
        </Card>
        <Card
          loading={loading}
          className={styles.offlineCard}
          title="Revenue, UserCount: Daily, by Branch-CardType-DinningPeriod"
          bordered={false}
          bodyStyle={{ padding: '0', marginTop: 16 }}
          style={{ marginBottom: 24 }}
        >
          <div style={{ padding: '0' }}>
            <TrendByThreeDimension
              data={sodexo.data.RevenueUserCountTrendOnBranchCardTypeDinningPeriod.slice()}
              valueField="Revenue"
              dimensions={[
                { dimension: "Branch", fields: ['中餐厅', '自助餐厅', '粤菜餐厅', '微餐厅晚餐1', '员工餐厅'] },
                { dimension: "CardType", fields: ['员工卡', '访客卡'] },
                { dimension: "DinningPeriod", fields: ['早餐', '晚餐', '午餐'] },
              ]}
            />
            <TrendByThreeDimension
              data={sodexo.data.RevenueUserCountTrendOnBranchCardTypeDinningPeriod.slice()}
              valueField="UserCount"
              dimensions={[
                { dimension: "Branch", fields: ['中餐厅', '自助餐厅', '粤菜餐厅', '微餐厅晚餐1', '员工餐厅'] },
                { dimension: "CardType", fields: ['员工卡', '访客卡'] },
                { dimension: "DinningPeriod", fields: ['早餐', '晚餐', '午餐'] },
              ]}
            />
          </div>
        </Card>
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
      </div>
    );
  }
}
