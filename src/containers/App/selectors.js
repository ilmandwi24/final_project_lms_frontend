import { createSelector } from 'reselect';
import { initialState } from '@containers/App/reducer';

const selectAppState = (state) => state.app || initialState;

export const selectLocale = createSelector(selectAppState, (state) => state.locale);
export const selectTheme = createSelector(selectAppState, (state) => state.theme);
export const selectPopup = createSelector(selectAppState, (state) => state.popup);
export const selectLoading = createSelector(selectAppState, (state) => state.loading);
export const selectData = createSelector(selectAppState, (state) => state.data);
export const selectCountryList = createSelector(selectAppState, (state) => state.countryList);
export const selectUser = createSelector(selectAppState, (state) => state.user);
export const selectCoursesByInstructor = createSelector(selectAppState, (state) => state.coursesByInstructor);
export const selectCoursesHome = createSelector(selectAppState, (state) => state.coursesHome);
export const selectLessonsByCourse = createSelector(selectAppState, (state) => state.lessonsByCourse);
export const selectGetJumlahCart = createSelector(selectAppState, (state) => state.jumlahCartItem);
export const selectCartItems = createSelector(selectAppState, (state) => state.cartItems);
export const selectTokenMidtrans = createSelector(selectAppState, (state) => state.token);
