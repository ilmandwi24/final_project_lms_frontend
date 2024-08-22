import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { Button, IconButton } from '@mui/material';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import AddBoxIcon from '@mui/icons-material/AddBox';
import { createStructuredSelector } from 'reselect';
import { connect, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { selectCoursesByInstructor, selectLessonsByCourse, selectUser } from '@containers/App/selectors';
import { useEffect } from 'react';
import { deleteLesson, getCoursesByInstructor, getLessonsByCourse } from '@containers/App/actions';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import styles from './style.module.scss';

const InstructorLesson = ({ courses, lessons }) => {
  const params = useParams();
  const dispatch = useDispatch();
  // const { id } = params;
  console.log('courses ---> ', courses);
  // console.log('lessons ---> ', lessons);
  const course = courses.find((item) => item.id === Number(params.id));
  const navigate = useNavigate();
  const { name, id } = course;
  useEffect(() => {
    // console.log(user);
    dispatch(getLessonsByCourse(id));
  }, [dispatch]);

  const handleDelete = (courseId, lessonId) => {
    // dispatch(deleteLesson(courseId, lessonId));
    dispatch(
      deleteLesson(courseId, lessonId, (response) => {
        console.log(response, ':: Handle Delete');
        // setSubmit(false);
        // navigate(`/dashboard/instructor/courses/${params.id}/lessons`, { replace: false });
      })
    );
  };
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Link to="/dashboard/instructor">
          <Button size="small" variant="outlined" startIcon={<KeyboardBackspaceIcon />}>
            Back
          </Button>
        </Link>{' '}
        <div>
          Course : {name} -- id:
          {id}
        </div>
        <div>
          <Link to={`/dashboard/instructor/courses/${id}/lessons/add`}>
            <Button variant="contained" color="primary" size="small">
              Add Lesson
              <AddBoxIcon sx={{ marginLeft: '0.2rem' }} />
            </Button>
          </Link>
        </div>
      </div>
      <div>
        <p className={styles.title}>List Lesson</p>
        <div className={styles.lessons}>
          {lessons.length === 0
            ? 'No Lesson'
            : lessons.map((item) => (
                <div key={item.id} className={styles.card}>
                  <span>{item.name}</span>
                  <div className={styles.icons}>
                    <Link to={`/dashboard/instructor/courses/${id}/lessons/${item.id}/edit`}>
                      <IconButton
                        color="warning"
                        aria-label="add to shopping cart"
                        size="small"
                        sx={{ margin: '0', padding: '0' }}
                      >
                        <EditIcon fontSize="small" />
                      </IconButton>
                    </Link>

                    <IconButton
                      color="error"
                      aria-label="add to shopping cart"
                      size="small"
                      sx={{ margin: '0', padding: '0' }}
                      onClick={() => handleDelete(params.id, item.id)}
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </div>
                </div>
              ))}

          {/* <div className={styles.card}>Lesson 1</div> */}
          {/* <div>Lesson 2</div> */}
        </div>
      </div>
    </div>
  );
};
InstructorLesson.propTypes = {
  user: PropTypes.object,
  courses: PropTypes.array,
  lessons: PropTypes.array,
};
const mapStateToProps = createStructuredSelector({
  user: selectUser,
  courses: selectCoursesByInstructor,
  lessons: selectLessonsByCourse,
});
export default connect(mapStateToProps)(InstructorLesson);
