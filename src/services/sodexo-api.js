import request from '../utils/request';

export async function getTemplate() {
  return Promise.resolve(templateData);
}

export async function getDailyRevenueUserCountWeatherTrend() {
  return request('api/sodexo/dailyRevenueUserCountWeatherTrend');
}

export async function getSplit() {

}

export async function getTop() {

}

export async function getHoliday() {

}
