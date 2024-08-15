import { Box, Button, Grid, Paper, Typography } from '@mui/material';
import mainCourse from '@static/images/main-course.png';
import styled from '@emotion/styled';
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
const MainCourses = () => (
  <div className={classes.container}>
    <h2 className={classes.title}>Courses you can take</h2>
    <Grid container spacing={2}>
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
      </Grid>
    </Grid>
    <Button
      variant="contained"
      sx={{ width: 'fit-content', marginTop: '2.5rem', marginLeft: 'auto', marginRight: 'auto' }}
    >
      Explore More
    </Button>
  </div>
);

export default MainCourses;
