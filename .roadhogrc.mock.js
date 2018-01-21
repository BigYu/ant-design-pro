import mockjs from 'mockjs';
import { getRule, postRule } from './mock/rule';
import { getActivities, getNotice, getFakeList } from './mock/api';
import { getFakeChartData } from './mock/chart';
import { imgMap } from './mock/utils';
import { getProfileBasicData } from './mock/profile';
import { getProfileAdvancedData } from './mock/profile';
import { getNotices } from './mock/notices';
import { format, delay } from 'roadhog-api-doc';
import d$DailyRevenueUserCountWeatherTrend from './data/DailyRevenueUserCountWeatherTrend';
import d$Events from './data/Events';
import d$LastMonthBottomSKU from './data/LastMonthBottomSKU';
import d$LastMonthRevenueOnBranch from './data/LastMonthRevenueOnBranch';
import d$LastMonthRevenueOnCardType from './data/LastMonthRevenueOnCardType';
import d$LastMonthRevenueOnDinningPeriod from './data/LastMonthRevenueOnDinningPeriod';
import d$LastMonthTopSKU from './data/LastMonthTopSKU';
import d$LastYearAverageSellCountForDifferentPriceRage from './data/LastYearAverageSellCountForDifferentPriceRage';
import d$LastYearBottomSKU from './data/LastYearBottomSKU';
import d$LastYearBuffetPeakHourAnalyze from './data/LastYearBuffetPeakHourAnalyze';
import d$LastYearEmployeeRestaurantPeakHourAnalyze from './data/LastYearEmployeeRestaurantPeakHourAnalyze';
import d$LastYearRevenueOnBranch from './data/LastYearRevenueOnBranch';
import d$LastYearRevenueOnCardType from './data/LastYearRevenueOnCardType';
import d$LastYearRevenueOnDinningPeriod from './data/LastYearRevenueOnDinningPeriod';
import d$LastYearTopSKU from './data/LastYearTopSKU';
import d$NearChineseNewYearAnalyse from './data/NearChineseNewYearAnalyse';
import d$NearNationalHolidayAnalyse from './data/NearNationalHolidayAnalyse';
import d$RevenueUserCountTrendOnBranch from './data/RevenueUserCountTrendOnBranch';
import d$RevenueUserCountTrendOnBranchCardType from './data/RevenueUserCountTrendOnBranchCardType';
import d$RevenueUserCountTrendOnBranchCardTypeDinningPeriod from './data/RevenueUserCountTrendOnBranchCardTypeDinningPeriod';
import d$RevenueUserCountTrendOnBranchDinningPeriod from './data/RevenueUserCountTrendOnBranchDinningPeriod';
import d$RevenueUserCountTrendOnCardType from './data/RevenueUserCountTrendOnCardType';
import d$RevenueUserCountTrendOnCardTypeDinningPeriod from './data/RevenueUserCountTrendOnCardTypeDinningPeriod';
import d$RevenueUserCountTrendOnDinningPeriod from './data/RevenueUserCountTrendOnDinningPeriod';
import d$LastMonthRevenueSplitOnBranchCardTypeDinningPeriod from './data/LastMonthRevenueSplitOnBranchCardTypeDinningPeriod';
import d$LastYearRevenueSplitOnBranchCardTypeDinningPeriod from './data/LastYearRevenueSplitOnBranchCardTypeDinningPeriod';
import d$LastMonthChargeOnCardType from './data/LastMonthChargeOnCardType';
import d$LastMonthEmployeeCardCharge from './data/LastMonthEmployeeCardCharge';
import d$LastYearChargeOnCardType from './data/LastYearChargeOnCardType';
import d$LastYearEmployeeCardCharge from './data/LastYearEmployeeCardCharge';
import d$TopSKUDailyTrend from './data/TopSKUDailyTrend';
import d$TopSKUDailyTrendOnCardType from './data/TopSKUDailyTrendOnCardType';
import d$TopSKUMonthlyTrend from './data/TopSKUMonthlyTrend';
import d$TopSKUWeeklyTrend from './data/TopSKUWeeklyTrend';

// 是否禁用代理
const noProxy = process.env.NO_PROXY === 'true';

// 代码中会兼容本地 service mock 以及部署站点的静态数据
const proxy = {
  // 支持值为 Object 和 Array
  'GET /api/currentUser': {
    $desc: "获取当前用户接口",
    $params: {
      pageSize: {
        desc: '分页',
        exp: 2,
      },
    },
    $body: {
      name: 'Serati Ma',
      avatar: 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png',
      userid: '00000001',
      notifyCount: 12,
    },
  },
  // GET POST 可省略
  'GET /api/sodexo/all': (req, res) => {
    res.send({
      DailyRevenueUserCountWeatherTrend: d$DailyRevenueUserCountWeatherTrend,
      Events: d$Events,
      LastMonthBottomSKU: d$LastMonthBottomSKU,
      LastMonthRevenueOnBranch: d$LastMonthRevenueOnBranch,
      LastMonthRevenueOnCardType: d$LastMonthRevenueOnCardType,
      LastMonthRevenueOnDinningPeriod: d$LastMonthRevenueOnDinningPeriod,
      LastMonthTopSKU: d$LastMonthTopSKU,
      LastYearAverageSellCountForDifferentPriceRage: d$LastYearAverageSellCountForDifferentPriceRage,
      LastYearBottomSKU: d$LastYearBottomSKU,
      LastYearBuffetPeakHourAnalyze: d$LastYearBuffetPeakHourAnalyze,
      LastYearEmployeeRestaurantPeakHourAnalyze: d$LastYearEmployeeRestaurantPeakHourAnalyze,
      LastYearRevenueOnBranch: d$LastYearRevenueOnBranch,
      LastYearRevenueOnCardType: d$LastYearRevenueOnCardType,
      LastYearRevenueOnDinningPeriod: d$LastYearRevenueOnDinningPeriod,
      LastYearTopSKU: d$LastYearTopSKU,
      NearChineseNewYearAnalyse: d$NearChineseNewYearAnalyse,
      NearNationalHolidayAnalyse: d$NearNationalHolidayAnalyse,
      RevenueUserCountTrendOnBranch: d$RevenueUserCountTrendOnBranch,
      RevenueUserCountTrendOnBranchCardType: d$RevenueUserCountTrendOnBranchCardType,
      RevenueUserCountTrendOnBranchCardTypeDinningPeriod: d$RevenueUserCountTrendOnBranchCardTypeDinningPeriod,
      RevenueUserCountTrendOnBranchDinningPeriod: d$RevenueUserCountTrendOnBranchDinningPeriod,
      RevenueUserCountTrendOnCardType: d$RevenueUserCountTrendOnCardType,
      RevenueUserCountTrendOnCardTypeDinningPeriod: d$RevenueUserCountTrendOnCardTypeDinningPeriod,
      RevenueUserCountTrendOnDinningPeriod: d$RevenueUserCountTrendOnDinningPeriod,
      TopSKUDailyTrend: d$TopSKUDailyTrend,
      TopSKUDailyTrendOnCardType: d$TopSKUDailyTrendOnCardType,
      TopSKUMonthlyTrend: d$TopSKUMonthlyTrend,
      TopSKUWeeklyTrend: d$TopSKUWeeklyTrend,
      LastMonthRevenueSplitOnBranchCardTypeDinningPeriod: d$LastMonthRevenueSplitOnBranchCardTypeDinningPeriod,
      LastYearRevenueSplitOnBranchCardTypeDinningPeriod: d$LastYearRevenueSplitOnBranchCardTypeDinningPeriod,
      LastMonthChargeOnCardType: d$LastMonthChargeOnCardType,
      LastMonthEmployeeCardCharge: d$LastMonthEmployeeCardCharge,
      LastYearChargeOnCardType: d$LastYearChargeOnCardType,
      LastYearEmployeeCardCharge: d$LastYearEmployeeCardCharge,
    });
  },
  'GET /api/users': [{
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
  }, {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
  }, {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
  }],
  'GET /api/project/notice': getNotice,
  'GET /api/activities': getActivities,
  'GET /api/rule': getRule,
  'POST /api/rule': {
    $params: {
      pageSize: {
        desc: '分页',
        exp: 2,
      },
    },
    $body: postRule,
  },
  'POST /api/forms': (req, res) => {
    res.send({ message: 'Ok' });
  },
  'GET /api/tags': mockjs.mock({
    'list|100': [{ name: '@city', 'value|1-100': 150, 'type|0-2': 1 }]
  }),
  'GET /api/fake_list': getFakeList,
  'GET /api/fake_chart_data': getFakeChartData,
  'GET /api/profile/basic': getProfileBasicData,
  'GET /api/profile/advanced': getProfileAdvancedData,
  'POST /api/login/account': (req, res) => {
    const { password, userName, type } = req.body;
    if(password === '888888' && userName === 'admin'){
      res.send({
        status: 'ok',
        type,
        currentAuthority: 'admin'
      });
      return ;
    }
    if(password === '123456' && userName === 'user'){
      res.send({
        status: 'ok',
        type,
        currentAuthority: 'user'
      });
      return ;
    }
    res.send({
      status: 'error',
      type,
      currentAuthority: 'guest'
    });
  },
  'POST /api/register': (req, res) => {
    res.send({ status: 'ok', currentAuthority: 'user' });
  },
  'GET /api/notices': getNotices,
  'GET /api/500': (req, res) => {
    res.status(500).send({
      "timestamp": 1513932555104,
      "status": 500,
      "error": "error",
      "message": "error",
      "path": "/base/category/list"
    });
  },
  'GET /api/404': (req, res) => {
    res.status(404).send({
      "timestamp": 1513932643431,
      "status": 404,
      "error": "Not Found",
      "message": "No message available",
      "path": "/base/category/list/2121212"
    });
  },
  'GET /api/403': (req, res) => {
    res.status(403).send({
      "timestamp": 1513932555104,
      "status": 403,
      "error": "Unauthorized",
      "message": "Unauthorized",
      "path": "/base/category/list"
    });
  },
  'GET /api/401': (req, res) => {
    res.status(401).send({
      "timestamp": 1513932555104,
      "status": 401,
      "error": "Unauthorized",
      "message": "Unauthorized",
      "path": "/base/category/list"
    });
  },
};

export default noProxy ? {} : delay(proxy, 1000);
