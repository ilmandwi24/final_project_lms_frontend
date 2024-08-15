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
};

export const storedKey = ['locale', 'theme', 'user'];

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
      case SET_COURSES_BY_INSTRUCTOR:
        draft.coursesByInstructor = action.courses;
        break;
    }
  });

export default appReducer;
