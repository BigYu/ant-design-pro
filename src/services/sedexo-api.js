import request from '../utils/request';

export async function getTemplate() {
  return Promise.resolve(templateData);
}

export async function getTrend() {
  return request('api/sodexo/trend');
}

export async function getSplit() {

}

export async function getTop() {

}

export async function getHoliday() {

}
