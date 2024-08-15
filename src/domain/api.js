import { merge } from 'lodash';

import request from '@utils/request';

const urls = {
  json: 'http://localhost:3000/api/data.json',
  countryGetAllKist: 'https://restcountries.com/v3.1/all',
  backend: 'http://localhost:8080',
};

export const callAPI = async (endpoint, method, header = {}, params = {}, data = {}) => {
  const defaultHeader = {
    'Content-Type': 'application/json; charset=UTF-8',
  };

  const headers = merge(defaultHeader, header);
  const options = {
    baseURL: endpoint,
    url: endpoint,
    method,
    headers,
    data,
    params,
  };

  return request(options).then((response) => {
    const responseAPI = response.data;
    return responseAPI;
  });
};

export const getData = () => callAPI(urls.json, 'get');

export const getCountryList = () => callAPI(urls.countryGetAllKist, 'get', {}, {});
export const addCourse = (payload) => callAPI(`${urls.backend}/api/courses/add`, 'post', {}, {}, payload);
export const getCoursesByInstructor = (payload) =>
  callAPI(`${urls.backend}/api/courses/instructors/${payload.id}`, 'get', {
    Authorization: `Bearer ${payload.token}`,
  });
