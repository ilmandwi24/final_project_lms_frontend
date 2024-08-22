import { takeLatest, call, put } from 'redux-saga/effects';

import {
  getData,
  getCountryList,
  getCoursesByInstructor,
  addLessonToCourse,
  getLessonsByCourse,
  deleteLesson,
  editLessonToCourse,
  addCourse,
  editCourse,
  deleteCourse,
  getCourseHome,
  getJumlahCart,
  getCartItems,
  getTokenMidtrans,
} from '@domain/api';
import {
  showPopup,
  setLoading,
  setData,
  setCountryList,
  setCoursesByInstructor,
  setLessonsByCourse,
  deleteLessonState,
  deleteCourseState,
  setCoursesHome,
  setJumlahCartItem,
  setCartItems,
  setTokenMidtrans,
} from '@containers/App/actions';
import {
  GET_DATA,
  GET_COUNTRY_LIST,
  GET_COURSES_BY_INSTRUCTOR,
  ADD_COURSE,
  ADD_LESSON,
  GET_LESSONS_BY_COURSE,
  DELETE_LESSON,
  EDIT_LESSON,
  EDIT_COURSE,
  DELETE_COURSE,
  GET_COURSES_HOME,
  GET_JUMLAH_CART,
  GET_CART_ITEMS,
  GET_TOKEN_MIDTRANS,
} from '@containers/App/constants';

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

function* doAddCourse({ payload, cbSuccess }) {
  yield put(setLoading(true));
  try {
    const response = yield call(addCourse, payload);
    // console.log(response);
    if (response) {
      cbSuccess && cbSuccess(response);
      //   yield put(setCoursesByInstructor(response.data.list));
    }
  } catch (error) {
    yield put(showPopup());
  }
  yield put(setLoading(false));
}

function* doGetCoursesHome() {
  yield put(setLoading(true));
  try {
    const response = yield call(getCourseHome);
    console.log(response.data.list);
    if (response) {
      // cbSuccess && cbSuccess(response);
      // yield put(setCoursesHome())
      yield put(setCoursesHome(response.data.list));
    }
  } catch (error) {
    yield put(showPopup());
  }
  yield put(setLoading(false));
}
function* doEditCourse({ courseId, instructorId, payload, cbSuccess }) {
  yield put(setLoading(true));
  try {
    const response = yield call(editCourse, courseId, instructorId, payload);
    // console.log(response);
    if (response) {
      cbSuccess && cbSuccess(response);
      //   yield put(setCoursesByInstructor(response.data.list));
    }
  } catch (error) {
    yield put(showPopup());
  }
  yield put(setLoading(false));
}

function* doDeleteCourse({ courseId, instructorId, cbSuccess }) {
  yield put(setLoading(true));
  try {
    const response = yield call(deleteCourse, courseId, instructorId);
    // console.log(response);
    if (response) {
      yield put(deleteCourseState(courseId, instructorId));

      cbSuccess && cbSuccess(response);
      //   yield put(setCoursesByInstructor(response.data.list));
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
    console.log(response);
  } catch (error) {
    console.log(error, 'getCoursesByInstructor');
    if (error.response.status === 404) {
      yield put(setCoursesByInstructor([]));
    }
    // yield put(showPopup());
  }
  yield put(setLoading(false));
}

function* doAddLessonToCourse({ id, payload, cbSuccess }) {
  yield put(setLoading(true));
  try {
    const response = yield call(addLessonToCourse, id, payload);
    console.log(response);
    if (response) {
      cbSuccess && cbSuccess(response);
      //   yield put(setCoursesByInstructor(response.data.list));
    }
  } catch (error) {
    yield put(showPopup());
  }
  yield put(setLoading(false));
}

function* doEditLessonToCourse({ courseId, lessonId, payload, cbSuccess }) {
  yield put(setLoading(true));
  console.log(courseId, lessonId, payload, cbSuccess, '+--saga');
  try {
    const response = yield call(editLessonToCourse, courseId, lessonId, payload);
    console.log(response, '----sagaResponse');
    if (response) {
      cbSuccess && cbSuccess(response);
      //   yield put(setCoursesByInstructor(response.data.list));
    }
  } catch (error) {
    yield put(showPopup());
  }
  yield put(setLoading(false));
}
function* doGetLessonsByCourse(action) {
  yield put(setLoading(true));
  try {
    // console.log(action, '--action');
    console.log(action);
    const response = yield call(getLessonsByCourse, action.id);
    if (response) {
      console.log(response.data.list, '--saga');
      yield put(setLessonsByCourse(response.data.list));
    }
  } catch (error) {
    // console.log(error.response.status, '-----');
    if (error.response.status === 404) {
      yield put(setLessonsByCourse([]));
    }
    // yield put(showPopup());
  }
  yield put(setLoading(false));
}
function* doDeleteLesson({ courseId, lessonId, cbSuccess }) {
  yield put(setLoading(true));
  try {
    console.log('--action');
    console.log(courseId, lessonId);
    const response = yield call(deleteLesson, courseId, lessonId);
    // if (response) {
    //   console.log(response.data.list, '--saga');
    //   yield put(setLessonsByCourse(response.data.list));
    // }
    if (response) {
      yield put(deleteLessonState(courseId, lessonId));
      cbSuccess && cbSuccess(response);
      //   yield put(setCoursesByInstructor(response.data.list));
    }
  } catch (error) {
    // console.log(error.response.status, '-----');
    if (error.response.status === 404) {
      yield put(setLessonsByCourse([]));
    }
    // yield put(showPopup());
  }
  yield put(setLoading(false));
}
function* doGetJumlahCart({ userId }) {
  yield put(setLoading(true));
  console.log(userId, '----app saga');
  // console.log(, '----saga');
  try {
    // console.log('--action');
    // console.log(courseId, lessonId);
    const response = yield call(getJumlahCart, userId);
    // if (response) {
    //   console.log(response.data.list, '--saga');
    //   yield put(setLessonsByCourse(response.data.list));
    // }
    if (response) {
      // console.log(response.data.jumlah_cart_item, '--response');
      yield put(setJumlahCartItem(response.data.jumlah_cart_item));
      // cbSuccess && cbSuccess(response);
      //   yield put(setCoursesByInstructor(response.data.list));
    }
  } catch (error) {
    console.log(error.response.status, '-----');
    // if (error.response.status === 404) {
    //   yield put(setLessonsByCourse([]));
    // }
    yield put(showPopup());
  }
  yield put(setLoading(false));
}

function* doGetCartItems({ userId }) {
  yield put(setLoading(true));
  // console.log(, '----saga');
  try {
    // console.log('--action');
    // console.log(courseId, lessonId);
    const response = yield call(getCartItems, userId);
    // if (response) {
    //   console.log(response.data.list, '--saga');
    //   yield put(setLessonsByCourse(response.data.list));
    // }
    if (response) {
      console.log(response.data);
      // console.log(response.data.jumlah_cart_item, '--response');
      // yield put(setJumlahCartItem(response.data.jumlah_cart_item));
      // cbSuccess && cbSuccess(response);
      //   yield put(setCoursesByInstructor(response.data.list));
      yield put(setCartItems(response.data));
    }
  } catch (error) {
    console.log(error.response.status, '-----');
    // if (error.response.status === 404) {
    //   yield put(setLessonsByCourse([]));
    // }
    yield put(showPopup());
  }
  yield put(setLoading(false));
}
function* doGetTokenMidtrans({ payload }) {
  yield put(setLoading(true));
  // console.log(, '----saga');
  try {
    // console.log('--action');
    // console.log(courseId, lessonId);
    console.log(payload, '----payload');
    const response = yield call(getTokenMidtrans, payload);
    console.log(response, '----response');
    // if (response) {
    //   console.log(response.data.list, '--saga');
    //   yield put(setLessonsByCourse(response.data.list));
    // }
    if (response) {
      console.log(response.data.token);
      // console.log(response.data.jumlah_cart_item, '--response');
      // yield put(setJumlahCartItem(response.data.jumlah_cart_item));
      // cbSuccess && cbSuccess(response);
      //   yield put(setCoursesByInstructor(response.data.list));
      // yield put(setCartItems(response.data));
      yield put(setLoading(false));
      // console.log(response.data.token, 'saga');
      yield put(setTokenMidtrans(response.data.token));
    }
  } catch (error) {
    console.log(error, '-----');
    // if (error.response.status === 404) {
    //   yield put(setLessonsByCourse([]));
    // }
    yield put(showPopup());
  }
  yield put(setLoading(false));
}

export default function* appSaga() {
  yield takeLatest(GET_DATA, doGetData);
  yield takeLatest(GET_COUNTRY_LIST, doGetCountryList);
  yield takeLatest(GET_COURSES_BY_INSTRUCTOR, doGetCoursesByInstructor);
  yield takeLatest(ADD_COURSE, doAddCourse);
  yield takeLatest(GET_COURSES_HOME, doGetCoursesHome);
  yield takeLatest(EDIT_COURSE, doEditCourse);
  yield takeLatest(DELETE_COURSE, doDeleteCourse);
  yield takeLatest(ADD_LESSON, doAddLessonToCourse);
  yield takeLatest(EDIT_LESSON, doEditLessonToCourse);
  yield takeLatest(GET_LESSONS_BY_COURSE, doGetLessonsByCourse);
  yield takeLatest(DELETE_LESSON, doDeleteLesson);
  yield takeLatest(GET_JUMLAH_CART, doGetJumlahCart);
  yield takeLatest(GET_CART_ITEMS, doGetCartItems);
  yield takeLatest(GET_TOKEN_MIDTRANS, doGetTokenMidtrans);
}
