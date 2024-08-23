import PropTypes from 'prop-types';
import { connect, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Box, Button, Grid, Paper, Typography } from '@mui/material';
import mainCourse from '@static/images/main-course.png';
import styled from '@emotion/styled';
import { selectCoursesHome, selectUser } from '@containers/App/selectors';
import { useEffect } from 'react';
import { addCourseToCart, getCoursesHome } from '@containers/App/actions';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import { useNavigate } from 'react-router-dom';
import classes from './style.module.scss';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  // padding: theme.spacing(1),
  padding: 8,
  textAlign: 'left',
  color: theme.palette.text.secondary,
  border: '2px solid black',
  display: 'flex',
  flexDirection: 'column',

  height: '100%',
}));

const formatCurrencyWithoutPrefix = (amount) => {
  const formatted = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0, // Adjust if you want to control decimal places
  }).format(amount);
  return formatted.replace('Rp', '').trim();
};

const MainCourses = ({ user, courses }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(getCoursesHome());
  }, [dispatch]);

  useEffect(() => {
    console.log(courses, 'baru');
  }, [courses]);

  const handleAddToCart = (courseId) => {
    // console.log(user.cart_id);
    const data = {
      cartId: user.cart_id,
      courseId,
      // course_Id2: courseId,
    };
    dispatch(addCourseToCart(data));
    navigate('/');
  };
  return (
    <div className={classes.container}>
      <h2 className={classes.title}>Courses you can take</h2>
      <Grid container rowSpacing={6} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        {courses.length > 0 ? (
          courses.map((course, index) => (
            <Grid item xs={6} md={4} key={index}>
              <Item sx={{ border: '2px solid black' }}>
                <Box sx={{ textAlign: 'center' }}>
                  <img src={mainCourse} alt="" width="100%" />
                </Box>
                <h3>{course.name}</h3>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <AccountBoxIcon sx={{ ml: -0.5, mb: 0.5 }} />
                  {course.instructor_name}
                </Box>
                <Typography variant="caption" display="block" gutterBottom>
                  {`Rp. ${formatCurrencyWithoutPrefix(course.price)}`}
                </Typography>
                <Box>
                  <Button variant="contained" onClick={() => handleAddToCart(course.id)}>
                    Add To Card
                  </Button>
                </Box>
              </Item>
            </Grid>
          ))
        ) : (
          <>No course available</>
        )}
        {/* <Grid item xs={6} md={4}>
          <Item sx={{ border: '2px solid black' }}>
            <Box sx={{ textAlign: 'center' }}>
              <img src={mainCourse} alt="" width="100%" />
            </Box>
            <h3>Memahami Konsep UI dan UX</h3>
            <h4>Old Kebayoran Dev</h4>
            <Typography variant="caption" display="block" gutterBottom>
              Rp. 250.000
            </Typography>
          </Item>
        </Grid>
        <Grid item xs={6} md={4}>
          <Item sx={{ border: '2px solid black' }}>
            <Box sx={{ textAlign: 'center' }}>
              <img src={mainCourse} alt="" width="100%" />
            </Box>

            <h3>Kotlin Android untuk Pemula: Membuat Aplikasi Todolist</h3>

            <h4>Old Kebayoran Dev</h4>
            <Typography variant="caption" display="block" gutterBottom>
              Rp. 250.000
            </Typography>
          </Item>
        </Grid>
        <Grid item xs={6} md={4}>
          <Item sx={{ border: '2px solid black' }}>
            <Box sx={{ textAlign: 'center' }}>
              <img src={mainCourse} alt="" width="100%" />
            </Box>
            <h3>Memahami Konsep UI dan UX</h3>
            <h4>Old Kebayoran Dev</h4>
            <Typography variant="caption" display="block" gutterBottom>
              Rp. 250.000
            </Typography>
          </Item>
        </Grid> */}
      </Grid>
      <Button
        variant="contained"
        sx={{ width: 'fit-content', marginTop: '2.5rem', marginLeft: 'auto', marginRight: 'auto' }}
      >
        Explore More
      </Button>
    </div>
  );
};

MainCourses.propTypes = {
  user: PropTypes.object,
  courses: PropTypes.array,
};

const mapStateToProps = createStructuredSelector({
  user: selectUser,
  courses: selectCoursesHome,
});

export default connect(mapStateToProps)(MainCourses);
