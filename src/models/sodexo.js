import { getData } from '../services/sodexo-api';

export default {
  namespace: 'sodexo',

  state: {
    data: {
      DailyRevenueUserCountWeatherTrend: [],
      LastMonthRevenueOnBranch: [],
      LastMonthRevenueOnCardType: [],
      LastMonthRevenueOnBraLastMonthRevenueOnDinningPeriodnch: [],
      LastMonthTopSKU: [],
      LastYearRevenueOnBranch: [],
      LastYearRevenueOnCardType: [],
      LastYearRevenueOnDinningPeriod: [],
      LastYearTopSKU: [],
      NearChineseNewYearAnalyse: [],
      NearNationalHolidayAnalyse: [],
      RevenueUserCountTrendOnBranch: [],
      RevenueUserCountTrendOnBranchCardType: [],
      RevenueUserCountTrendOnBranchCardTypeDinningPeriod: [],
      RevenueUserCountTrendOnBranchDinningPeriod: [],
      RevenueUserCountTrendOnCardType: [],
      RevenueUserCountTrendOnCardTypeDinningPeriod: [],
      RevenueUserCountTrendOnDinningPeriod: [],
      TopSKUDailyTrend: [],
      TopSKUDailyTrendOnCardType: [],
      TopSKUMonthlyTrend: [],
      TopSKUWeeklyTrend: [],
    },
  },

  effects: {
    *fetchData({ payload }, { call, put }) {
      const response = yield call(getData, payload);

      yield put({
        type: 'onDataReady',
        payload: response,
      });
    },
  },

  reducers: {
    onDataReady(state, action) {
      return {
        ...state,
        data: action.payload,
      };
    },
  },
};
