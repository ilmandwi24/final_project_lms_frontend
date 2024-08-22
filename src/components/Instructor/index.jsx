import { AccountCircle } from '@mui/icons-material';

import {
  Box,
  Button,
  ButtonBase,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Input,
  Pagination,
  Popover,
  TextField,
  Typography,
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import PreviewIcon from '@mui/icons-material/Preview';
import AddBoxIcon from '@mui/icons-material/AddBox';
import { deleteCourse, getCoursesByInstructor } from '@containers/App/actions';
import { connect, useDispatch } from 'react-redux';
import { selectUser, selectCoursesByInstructor } from '@containers/App/selectors';
import { createStructuredSelector } from 'reselect';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import ViewListIcon from '@mui/icons-material/ViewList';
import EditIcon from '@mui/icons-material/Edit';
import defaultCover from '../../static/images/default-cover-course.png';
import classes from './style.module.scss';

const ariaLabel = { 'aria-label': 'description' };

const Instructor = ({ user, courses }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [dataCourses, setDataCourses] = useState([]);

  const handleDelete = (courseId) => {
    // setAnchorEl(event.currentTarget);

    dispatch(
      deleteCourse(courseId, user.id, (response) => {
        console.log(response, ':: Handle Delete');
        // /courses/21/instructors/1
        navigate(`/dashboard/instructor`, { replace: false });
      })
    );
  };

  const handleLessons = (id, name) => {
    navigate(`/dashboard/instructor/courses/${id}/lessons`, { state: { id, name } });
  };
  useEffect(() => {
    console.log(user);
    dispatch(getCoursesByInstructor({ id: user.id }));
  }, [dispatch]);
  useEffect(() => {
    // Sort the courses by id when the component mounts
    const sortedCourses = [...courses].sort((a, b) => b.id - a.id);
    setDataCourses(sortedCourses);
  }, [courses]);
  return (
    <div className={classes.container}>
      {/* {console.log(courses, '---courses')} */}
      <Box className={classes.feature}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: '1rem',
            // backgroundColor: 'green',
            flexBasis: '50%',
          }}
        >
          <Input placeholder="Search your course" inputProps={ariaLabel} sx={{ width: '100%' }} />
          <IconButton aria-label="search">
            <SearchIcon sx={{ color: 'action.active' }} />
          </IconButton>
        </Box>
        <Link to="/dashboard/instructor/add-course">
          <Button variant="contained" color="primary">
            Add Course
            <AddBoxIcon sx={{ marginLeft: '.2rem' }} />
          </Button>
        </Link>
      </Box>
      <Box sx={{ display: 'flex', gap: 3, flexDirection: 'column' }}>
        {dataCourses.length > 0
          ? dataCourses.map((course) => (
              <Card
                key={course.id}
                sx={{
                  display: 'flex',
                  paddingBottom: '!important 0rem ',
                  border: '1px solid gray',
                  position: 'relative',
                }}
              >
                <Box sx={{ display: 'flex', flexDirection: 'column', position: 'absolute', top: 2, right: 4 }}>
                  <IconButton
                    color="error"
                    aria-label="add to shopping cart"
                    size="small"
                    onClick={() => handleDelete(course.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                  {/* <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                // sx={{ p: 10 }}
              >
                <Typography sx={{ p: '.5rem' }}>Delete this?</Typography>
                <Box width="100%">
                  <Button onClick={handleClose} size="small" color="inherit" variant="contained">
                    No
                  </Button>
                  <Button variant="contained" color="error" size="small" sx={{ borderRadius: 0 }}>
                    Yes
                  </Button>
                </Box>
              </Popover> */}
                </Box>
                <CardMedia
                  component="img"
                  sx={{ width: 214, height: 120 }}
                  image={defaultCover}
                  alt="Live from space album cover"
                />

                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    textAlign: 'left',
                    paddingBottom: '!important 0rem ',
                  }}
                >
                  <CardContent
                    sx={{
                      flex: '1 0 auto',
                      padding: '0 .5rem',
                      // paddingTop: '0rem',
                      justifyContent: 'space-between',
                      display: 'flex',
                      // gap: 1,
                      flexDirection: 'column',
                      '&:last-child': {
                        paddingBottom: '.25rem',
                      },
                    }}
                  >
                    <Box>
                      <Typography component="div" variant="subtitle1">
                        {course.name}
                      </Typography>
                      {/* <ButtonBase sx={{ bgcolor: 'info.main', color: '#fff', px: 1, py: 0.5, borderRadius: 1 }} primary>
                  Add Lesson
                </ButtonBase> */}
                      <Box sx={{ display: 'flex', gap: 0.5 }}>
                        <ButtonBase
                          sx={{ bgcolor: 'info.main', color: '#fff', px: 1, py: 0.1, borderRadius: 1 }}
                          primary
                        >
                          Preview <PreviewIcon fontSize="small" sx={{ ml: 0.5 }} />
                        </ButtonBase>
                        <Link to={`/dashboard/instructor/courses/${course.id}/edit`}>
                          <ButtonBase
                            sx={{ bgcolor: 'warning.main', color: '#fff', px: 1, py: 0.1, borderRadius: 1 }}
                            primary
                          >
                            Edit
                            {/* <PreviewIcon fontSize="small" sx={{ ml: 0.5 }} /> */}
                            <EditIcon fontSize="small" sx={{ ml: 0.5 }} />
                          </ButtonBase>
                        </Link>
                      </Box>
                    </Box>

                    {/* <Typography variant="body" color="text.secondary" component="div">
                  Mac Miller
                </Typography> */}
                    <Box>
                      <Button
                        variant="contained"
                        color="info"
                        size="small"
                        onClick={() => handleLessons(course.id, course.name)}
                      >
                        Lessons <ViewListIcon fontSize="small" sx={{ ml: 0.5 }} />
                      </Button>
                    </Box>
                  </CardContent>

                  {/* <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
                <IconButton aria-label="previous">
                  {theme.direction === 'rtl' ? <SkipNextIcon /> : <SkipPreviousIcon />}
                </IconButton>
                <IconButton aria-label="play/pause">
                  <PlayArrowIcon sx={{ height: 38, width: 38 }} />
                </IconButton>
                <IconButton aria-label="next">
                  {theme.direction === 'rtl' ? <SkipPreviousIcon /> : <SkipNextIcon />}
                </IconButton>
              </Box> */}
                </Box>
              </Card>
            ))
          : 'No Course'}
      </Box>
      <Pagination count={10} shape="rounded" color="primary" />
    </div>
  );
};

Instructor.propTypes = {
  user: PropTypes.object,
  courses: PropTypes.array,
};
const mapStateToProps = createStructuredSelector({
  user: selectUser,
  courses: selectCoursesByInstructor,
});
export default connect(mapStateToProps)(Instructor);
