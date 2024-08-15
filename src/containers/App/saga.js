import { takeLatest, call, put } from 'redux-saga/effects';

import { getData, getCountryList, getCoursesByInstructor } from '@domain/api';
import { showPopup, setLoading, setData, setCountryList, setCoursesByInstructor } from '@containers/App/actions';
import { GET_DATA, GET_COUNTRY_LIST, GET_COURSES_BY_INSTRUCTOR } from '@containers/App/constants';

function* doGetData() {
  yield put(setLoading(true));
  try {
    const response = yield call(getData);
    if (response) {
      yield put(setData(response.data));
    }
  } catch (error) {
    yield put(showPopup());
  }
  yield put(setLoading(false));
}

function* doGetCountryList() {
  yield put(setLoading(true));
  try {
    const response = yield call(getCountryList);
    if (response) {
      yield put(setCountryList(response));
    }
  } catch (error) {
    yield put(showPopup());
  }
  yield put(setLoading(false));
}

function* doGetCoursesByInstructor(action) {
  yield put(setLoading(true));
  try {
    // console.log(action, '--action');
    const response = yield call(getCoursesByInstructor, action.payload);
    if (response) {
      console.log(response.data.list, '--saga');
      yield put(setCoursesByInstructor(response.data.list));
    }
  } catch (error) {
    yield put(showPopup());
  }
  yield put(setLoading(false));
}

export default function* appSaga() {
  yield takeLatest(GET_DATA, doGetData);
  yield takeLatest(GET_COUNTRY_LIST, doGetCountryList);
  yield takeLatest(GET_COURSES_BY_INSTRUCTOR, doGetCoursesByInstructor);
}
