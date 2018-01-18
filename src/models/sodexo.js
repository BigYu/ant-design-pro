import { getDailyRevenueUserCountWeatherTrend } from '../services/sodexo-api';

export default {
  namespace: 'sodexo',

  state: {
    trendByWeather: undefined,
  },

  effects: {
    *fetchDailyRevenueUserCountWeatherTrend({ payload }, { call, put }) {
      const response = yield call(getDailyRevenueUserCountWeatherTrend, payload);

      yield put({
        type: 'updateDailyRevenueUserCountWeatherTrend',
        payload: Array.isArray(response) ? response : [],
      });
    },
  },

  reducers: {
    updateDailyRevenueUserCountWeatherTrend(state, action) {
      return {
        ...state,
        trendByWeather: action.payload,
      };
    },
  },
};
