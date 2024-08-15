import { Box, Grid } from '@mui/material';
import styled from '@emotion/styled';
import Paper from '@mui/material/Paper';
import catProgrammer from '@static/images/cat-programmer.png';
import catBusiness from '@static/images/cat-business.png';
import catDesign from '@static/images/cat-design.png';
import classes from './style.module.scss';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  // padding: theme.spacing(1),
  paddingTop: 24,
  paddingBottom: 24,
  textAlign: 'center',
  color: theme.palette.text.secondary,
  border: '2px solid black',
  display: 'flex',
  flexDirection: 'column',
}));

const Category = () => (
  <div className={classes.container}>
    <h2>Several categories available</h2>
    <Grid container spacing={2}>
      <Grid item xs={6} md={4}>
        <Item sx={{ border: '2px solid black' }}>
          <Box sx={{ textAlign: 'center', height: '280px', marginBottom: '1rem' }}>
            <img src={catProgrammer} alt="" width="100%" />
          </Box>
          <h3>Programmer</h3>
        </Item>
      </Grid>
      <Grid item xs={6} md={4}>
        <Item sx={{ border: '2px solid black' }}>
          <Box sx={{ textAlign: 'center', height: '280px', marginBottom: '1rem' }}>
            <img src={catDesign} alt="" width="100%" />
          </Box>
          <h3>Design</h3>
        </Item>
      </Grid>
      <Grid item xs={6} md={4}>
        <Item sx={{ border: '2px solid black' }}>
          <Box sx={{ textAlign: 'center', height: '280px', marginBottom: '1rem' }}>
            <img src={catBusiness} alt="" width="100%" />
          </Box>
          <h3>Business</h3>
        </Item>
      </Grid>
    </Grid>
  </div>
);

export default Category;
