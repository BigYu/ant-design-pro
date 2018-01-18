import request from '../utils/request';

export async function getData() {
  return request('api/sodexo/all');
}
