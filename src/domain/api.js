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
export const getCourseHome = () => callAPI(`${urls.backend}/api/courses?limit=6`, 'get', {}, {});

export const editCourse = (courseId, instructorId, payload) =>
  callAPI(`${urls.backend}/api/courses/${courseId}/instructors/${instructorId}`, 'put', {}, {}, payload);
// export const getCoursesByInstructor = (payload) =>
//   callAPI(`${urls.backend}/api/courses/instructors/${payload.id}`, 'get', {
//     Authorization: `Bearer ${payload.token}`,
//   });
export const deleteCourse = (courseId, instructorId) =>
  callAPI(`${urls.backend}/api/courses/${courseId}/instructors/${instructorId}`, 'delete', {}, {});
// export const getCoursesByInstructor = (payload) =>
//   callAPI(`${urls.backend}/api/courses/instructors/${payload.id}`, 'get', {
//     Authorization: `Bearer ${payload.token}`,
//   });
export const getCoursesByInstructor = (payload) =>
  callAPI(`${urls.backend}/api/courses/instructors/${payload.id}`, 'get', {});

export const addLessonToCourse = (id, course) =>
  callAPI(`${urls.backend}/api/courses/${id}/lessons`, 'post', {}, {}, course);

export const editLessonToCourse = (courseId, lessonId, course) =>
  callAPI(`${urls.backend}/api/courses/${courseId}/lessons/${lessonId}`, 'put', {}, {}, course);
export const getLessonsByCourse = (id) =>
  // callAPI(`${urls.backend}/api/courses/instructors/${payload.id}`, 'get', {});
  callAPI(`${urls.backend}/api/courses/${id}/lessons`, 'get', {});

export const deleteLesson = (courseId, lessonId) =>
  // callAPI(`${urls.backend}/api/courses/instructors/${payload.id}`, 'get', {});
  callAPI(`${urls.backend}/api/courses/${courseId}/lessons/${lessonId}`, 'delete', {});
export const getJumlahCart = (userId) =>
  // callAPI(`${urls.backend}/api/courses/instructors/${payload.id}`, 'get', {});
  callAPI(`${urls.backend}/api/carts/users/${userId}/count`, 'get', {});
export const getCartItems = (userId) =>
  // callAPI(`${urls.backend}/api/courses/instructors/${payload.id}`, 'get', {});
  callAPI(`${urls.backend}/api/carts/users/${userId}`, 'get', {});

export const getTokenMidtrans = (payload) => callAPI(`${urls.backend}/api/midtrans/get-token`, 'post', {}, {}, payload);
