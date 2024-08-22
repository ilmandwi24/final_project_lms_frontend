import { produce } from 'immer';

import {
  SET_LOCAL,
  SET_THEME,
  SET_POPUP,
  SET_LOADING,
  SET_DATA,
  SET_COUNTRY_LIST,
  SET_USER,
  SET_COURSES_BY_INSTRUCTOR,
  SET_LESSONS_BY_COURSE,
  DELETE_LESSON,
  DELETE_LESSON_STATE,
  DELETE_COURSE,
  GET_COURSES_HOME,
  SET_COURSES_HOME,
  GET_JUMLAH_CART,
  SET_JUMLAH_CART,
  SET_CART_ITEMS,
  SET_TOKEN_MIDTRANS,
} from '@containers/App/constants';

export const initialState = {
  locale: 'en',
  theme: 'dark',
  popup: {
    open: false,
    title: '',
    message: '',
  },
  data: [],
  loading: false,
  countryList: [],
  user: {},
  coursesByInstructor: [],
  lessonsByCourse: [],
  coursesHome: [],
  jumlahCartItem: 0,
  cartItems: {},
  token: '',
};

export const storedKey = [
  'locale',
  'theme',
  'user',
  'coursesByInstructor',
  'lessonsByCourse',
  'coursesHome',
  'jumlahCartItem',
  'cartItems',
  'token',
];

const appReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case SET_LOCAL:
        draft.locale = action.locale;
        break;
      case SET_THEME:
        draft.theme = action.theme;
        break;
      case SET_POPUP:
        draft.popup = action.popup;
        break;
      case SET_LOADING:
        draft.loading = action.loading;
        break;
      case SET_DATA:
        draft.data = action.data;
        break;
      case SET_COUNTRY_LIST:
        draft.countryList = action.countryList;
        break;
      case SET_USER:
        draft.user = action.user;
        break;
      case SET_COURSES_HOME:
        draft.coursesHome = action.courses;
        break;
      case SET_COURSES_BY_INSTRUCTOR:
        draft.coursesByInstructor = action.courses;
        break;
      case SET_LESSONS_BY_COURSE:
        draft.lessonsByCourse = action.lessons;
        break;
      case DELETE_LESSON:
        console.log(action, 'action');
        draft.lessonsByCourse = draft.lessonsByCourse.filter(
          (lesson) => lesson.id !== action.lessonId && lesson.courseId !== action.courseId
        );
        // draft.lessonsByCourse = draft.lessonsByCourse.filter((lesson) => lesson.id !== action.lessonId);
        break;
      case DELETE_COURSE:
        draft.coursesByInstructor = draft.coursesByInstructor.filter(
          (course) => course.id !== action.courseId && course.instructorId !== action.instructorId
        );
        break;
      case SET_JUMLAH_CART:
        // console.log(action, 'action');
        draft.jumlahCartItem = action.jumlah;
        break;
      case SET_CART_ITEMS:
        draft.cartItems = action.cartItems;
        break;
      case SET_TOKEN_MIDTRANS:
        // console.log(action, 'action');
        draft.token = action.token;
        break;
    }
  });

export default appReducer;
