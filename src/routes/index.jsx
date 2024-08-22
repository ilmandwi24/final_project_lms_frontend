import MainLayout from '@layouts/MainLayout';

// import Home from '@pages/Home';
import Main from '@pages/Main';
import NotFound from '@pages/NotFound';
import Register from '@pages/Register';
import Login from '@pages/Login';
import Profile from '@components/Profile';
import Instructor from '@components/Instructor';
import AdminLayout from '@layouts/AdminLayout';
import Student from '@components/Student';
import InstructorAddCourse from '@components/Instructor/InstructorAddCourse';
import InstructorLesson from '@components/Instructor/InstructorLesson';
import InstructorAddLesson from '@components/Instructor/InstructorAddLesson';
import InstructorEditLesson from '@components/Instructor/InstructorEditLesson';
import InstructorEditCourse from '@components/Instructor/InstructorEditCourse';
import Cart from '@pages/Cart';
// import Dashboard from '@pages/Dashboard';

const routes = [
  {
    path: '/',
    name: 'Main',
    protected: false,
    component: Main,
    layout: MainLayout,
  },
  {
    path: '/cart',
    name: 'Cart',
    protected: true,
    component: Cart,
    layout: MainLayout,
  },
  {
    path: '/login',
    name: 'Login',
    protected: false,
    component: Login,
    layout: MainLayout,
  },
  {
    path: '/register',
    name: 'Register',
    protected: false,
    component: Register,
    layout: MainLayout,
  },
  // {
  //   path: '/dashboard',
  //   name: 'Dashboard',
  //   protected: false,
  //   // component: Dashboard,

  //   subRoutes: [
  //     // {
  //     //   path: '/',
  //     //   name: 'dashboard',
  //     //   layout: AdminLayout,
  //     //   component: Dashboard,
  //     // },
  //     {
  //       path: '/profile',
  //       name: 'profile',
  //       layout: AdminLayout,
  //       component: Profile,
  //     },
  //     {
  //       path: '/instructor',
  //       name: 'instructor',
  //       layout: AdminLayout,
  //       component: Instructors,
  //     },
  //   ],
  // },

  {
    path: '/home',
    name: 'Home',
    protected: false,
    component: Main,
    layout: MainLayout,
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    layout: AdminLayout,
    protected: true,
    component: Profile,
  },
  {
    path: '/dashboard/profile',
    name: 'profile',
    layout: AdminLayout,
    protected: true,

    component: Profile,
  },

  {
    path: '/dashboard/instructor',
    name: 'instructor',
    layout: AdminLayout,
    protected: true,

    component: Instructor,
  },
  {
    path: '/dashboard/instructor/add-course',
    name: 'instructor add course',
    layout: AdminLayout,
    protected: true,

    component: InstructorAddCourse,
  },
  {
    path: '/dashboard/instructor/courses/:id/edit',
    name: 'instructor editcourse',
    layout: AdminLayout,
    protected: true,

    component: InstructorEditCourse,
  },
  {
    path: '/dashboard/instructor/courses/:id/lessons',
    name: 'instructor lesson',
    layout: AdminLayout,
    protected: true,

    component: InstructorLesson,
  },
  {
    path: '/dashboard/instructor/courses/:id/lessons/add',
    name: 'instructor add lesson',
    layout: AdminLayout,
    protected: true,

    component: InstructorAddLesson,
  },
  {
    path: '/dashboard/instructor/courses/:courseId/lessons/:lessonId/edit',
    name: 'instructor edit lesson',
    layout: AdminLayout,
    protected: true,

    component: InstructorEditLesson,
  },
  {
    path: '/dashboard/student',
    name: 'student',
    layout: AdminLayout,
    protected: true,

    component: Student,
  },

  { path: '*', name: 'Not Found', component: NotFound, layout: MainLayout, protected: false },
];

export default routes;
