import { getTrend } from '../services/sedexo-api';

export default {
  namespace: 'sodexo',

  state: {
    trend: undefined,
  },

  effects: {
    *fetchTrend({ payload }, { call, put }) {
      const response = yield call(getTrend, payload);

      yield put({
        type: 'updateTrend',
        payload: Array.isArray(response) ? response : [],
      });
    },
  },

  reducers: {
    updateTrend(state, action) {
      return {
        ...state,
        trend: action.payload,
      };
    },
  },
};
