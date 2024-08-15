import Category from '@components/Category';
import Hero from '@components/Hero';
import MainCourses from '@components/MainCourses';
import Footer from '@components/Footer';
import classes from './style.module.scss';

const index = () => (
  <div className={classes.container}>
    <Hero />
    <Category />
    <MainCourses />
    <Footer />
  </div>
);

export default index;
