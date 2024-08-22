/* eslint-disable jsx-a11y/label-has-associated-control */
import { Box, Button, FormControl, Input, InputLabel, TextField } from '@mui/material';
import Editor from 'react-simple-wysiwyg';
import { useEffect, useState } from 'react';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { selectUser, selectLessonsByCourse } from '@containers/App/selectors';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { connect, useDispatch } from 'react-redux';
import { addLesson, editLesson, getCoursesByInstructor } from '@containers/App/actions';
import classes from './style.module.scss';

const ariaLabel = { 'aria-label': 'description' };

const InstructorEditLesson = ({ user, lessons }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [submit, setSubmit] = useState(false);
  const urlHost = process.env.NODE_ENV !== 'production' ? 'http://localhost:8080' : process.env.API_HOST;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // console.log('lessons', lessons);
  const params = useParams();
  console.log(params.lessonId);
  const lesson = lessons.find((item) => item.id === Number(params.lessonId));
  useEffect(() => {
    setName(lesson.name);
    setDescription(lesson.content);
  }, []);
  function onChangeEditor(e) {
    setDescription(e.target.value);
  }

  function onChangeName(e) {
    setName(e.target.value);
  }

  function onSubmit(e) {
    console.log(user);
    e.preventDefault();
    setSubmit(true);

    const payload = {
      name,
      content: description,
    };

    dispatch(
      editLesson(params.courseId, params.lessonId, payload, (response) => {
        console.log(response, 'edit lesson');
        setSubmit(false);
        navigate(`/dashboard/instructor/courses/${params.courseId}/lessons`);
      })
    );

    console.log(name, description);
  }
  return (
    <form className={classes.container} onSubmit={(e) => onSubmit(e)}>
      <Box sx={{ textAlign: 'left', marginBottom: '1rem' }}>
        <Link
          to=".."
          onClick={(e) => {
            e.preventDefault();
            navigate(-1);
          }}
        >
          <Button size="small" variant="outlined" startIcon={<KeyboardBackspaceIcon />}>
            Back
          </Button>
        </Link>
      </Box>
      <div className={classes.formCover}>
        <div className={classes.cover}>
          <label id="add-img-label" htmlFor="add-single-img">
            Add Video Lesson
          </label>
        </div>
        <div className={classes.name}>
          <label htmlFor="courseName">
            Lesson Name
            <br />
            <Input
              placeholder="Contoh: Syntax Javascript"
              inputProps={ariaLabel}
              id="courseName"
              fullWidth
              onChange={onChangeName}
              value={name}
              required
            />
          </label>
        </div>
      </div>
      {/* <div className={classes.price}>
        <label htmlFor="coursePrice">Price</label>
        <Input
          defaultValue="Hello world"
          inputProps={ariaLabel}
          type="number"
          id="coursePrice"
          onChange={(e) => onChangePrice(e)}
          required
        />
      </div> */}
      <div className={classes.description}>
        <label htmlFor="courseDescription">Description</label>
        <Editor
          containerProps={{ style: { marginTop: '0.5rem', minHeight: '150px', resize: 'vertical' } }}
          value={description}
          onChange={onChangeEditor}
        />
      </div>
      <Box sx={{ textAlign: 'right', marginTop: '1rem' }}>
        <Button variant="contained" type="submit" disabled={submit} sx={{ textTransform: 'none' }}>
          {submit ? 'Updating...' : 'Update'}
        </Button>
      </Box>
    </form>
  );
};
InstructorEditLesson.propTypes = {
  user: PropTypes.object,
  lessons: PropTypes.array,
};
const mapStateToProps = createStructuredSelector({
  user: selectUser,
  lessons: selectLessonsByCourse,
});
export default connect(mapStateToProps)(InstructorEditLesson);
