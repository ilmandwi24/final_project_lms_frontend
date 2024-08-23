import {
  SET_LOCAL,
  SET_THEME,
  SET_POPUP,
  SET_LOADING,
  SET_DATA,
  GET_DATA,
  GET_COUNTRY_LIST,
  SET_COUNTRY_LIST,
  SET_USER,
  ADD_COURSE,
  GET_COURSES_BY_INSTRUCTOR,
  SET_COURSES_BY_INSTRUCTOR,
  ADD_LESSON,
  GET_LESSONS_BY_COURSE,
  SET_LESSONS_BY_COURSE,
  DELETE_LESSON,
  EDIT_LESSON,
  DELETE_LESSON_STATE,
  EDIT_COURSE,
  DELETE_COURSE,
  GET_COURSES_HOME,
  SET_COURSES_HOME,
  GET_JUMLAH_CART,
  SET_JUMLAH_CART,
  GET_CART_ITEMS,
  SET_CART_ITEMS,
  GET_TOKEN_MIDTRANS,
  SET_TOKEN_MIDTRANS,
  ADD_COURSE_TO_CART,
  INCREMENT_CART_ITEMS,
  DECREMENT_CART_ITEMS,
  DELETE_COURSE_FROM_CART,
} from '@containers/App/constants';

export const setLocale = (locale) => ({
  type: SET_LOCAL,
  locale,
});

export const setTheme = (theme) => ({
  type: SET_THEME,
  theme,
});

export const showPopup = (title = '', message = '') => ({
  type: SET_POPUP,
  popup: {
    open: true,
    title,
    message,
  },
});

export const hidePopup = () => ({
  type: SET_POPUP,
  popup: {
    open: false,
    title: '',
    message: '',
  },
});

export const setLoading = (loading) => ({
  type: SET_LOADING,
  loading,
});
export const setData = (data) => ({
  type: SET_DATA,
  data,
});

export const getData = () => ({
  type: GET_DATA,
});

export const getCountryList = () => ({
  type: GET_COUNTRY_LIST,
});

export const setCountryList = (countryList) => ({
  type: SET_COUNTRY_LIST,
  countryList,
});

export const setUser = (user) => ({
  type: SET_USER,
  user,
});

export const getCoursesHome = () => ({
  type: GET_COURSES_HOME,
});

export const setCoursesHome = (courses) => ({
  type: SET_COURSES_HOME,
  courses,
});

export const getCoursesByInstructor = (payload) => ({
  type: GET_COURSES_BY_INSTRUCTOR,
  payload,
});

export const setCoursesByInstructor = (courses) => ({
  type: SET_COURSES_BY_INSTRUCTOR,
  courses,
});

export const addCourse = (payload, cbSuccess) => ({
  type: ADD_COURSE,
  payload,
  cbSuccess,
});

export const editCourse = (courseId, instructorId, payload, cbSuccess) => ({
  type: EDIT_COURSE,
  courseId,
  instructorId,
  payload,
  cbSuccess,
});

export const deleteCourse = (courseId, instructorId, cbSuccess) => ({
  type: DELETE_COURSE,
  courseId,
  instructorId,
  cbSuccess,
});

export const deleteCourseState = (courseId, instructorId) => ({
  type: DELETE_COURSE,
  courseId,
  instructorId,
});

export const addLesson = (id, payload, cbSuccess) => ({
  type: ADD_LESSON,
  id,
  payload,
  cbSuccess,
});

export const editLesson = (courseId, lessonId, payload, cbSuccess) => ({
  type: EDIT_LESSON,
  courseId,
  lessonId,
  payload,
  cbSuccess,
});

export const getLessonsByCourse = (id) => ({
  type: GET_LESSONS_BY_COURSE,
  id,
});

export const setLessonsByCourse = (lessons) => ({
  type: SET_LESSONS_BY_COURSE,
  lessons,
});
export const deleteLesson = (courseId, lessonId, cbSuccess) => ({
  type: DELETE_LESSON,
  courseId,
  lessonId,
  cbSuccess,
});

export const deleteLessonState = (courseId, lessonId) => ({
  type: DELETE_LESSON,
  courseId,
  lessonId,
});

export const getJumlahCartItem = (userId) => ({
  type: GET_JUMLAH_CART,
  userId,
});

export const setJumlahCartItem = (jumlah) => ({
  type: SET_JUMLAH_CART,
  jumlah,
});

export const getCartItems = (userId) => ({
  type: GET_CART_ITEMS,
  userId,
});

export const setCartItems = (cartItems) => ({
  type: SET_CART_ITEMS,
  cartItems,
});

export const getTokenMidtrans = (payload) => ({
  type: GET_TOKEN_MIDTRANS,
  payload,
});

export const setTokenMidtrans = (token) => ({
  type: SET_TOKEN_MIDTRANS,
  token,
});

export const addCourseToCart = (payload) => ({
  type: ADD_COURSE_TO_CART,
  payload,
});

export const incrementCartItems = () => ({
  type: INCREMENT_CART_ITEMS,
});
export const decrementCartItems = () => ({
  type: DECREMENT_CART_ITEMS,
});

export const deleteCourseFromCart = (cartId, courseId) => ({
  type: DELETE_COURSE_FROM_CART,
  cartId,
  courseId,
});
