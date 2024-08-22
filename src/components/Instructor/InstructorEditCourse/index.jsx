/* eslint-disable jsx-a11y/label-has-associated-control */
import { Box, Button, FormControl, Input, InputLabel, TextField } from '@mui/material';
import Editor from 'react-simple-wysiwyg';
import { useEffect, useState } from 'react';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { selectUser, selectCoursesByInstructor } from '@containers/App/selectors';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { connect, useDispatch } from 'react-redux';
import { editCourse } from '@containers/App/actions';
import classes from './style.module.scss';

const ariaLabel = { 'aria-label': 'description' };

const InstructorEditCourse = ({ user, courses }) => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState('');
  const [submit, setSubmit] = useState(false);
  const urlHost = process.env.NODE_ENV !== 'production' ? 'http://localhost:8080' : process.env.API_HOST;
  const params = useParams();
  const course = courses.find((item) => item.id === Number(params.id) && item.instructor_id === user.id);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    console.log(course, '---useEffect');
    setName(course.name);
    setDescription(course.description);
    setPrice(course.price);
    // setName(lesson.name);
    // setDescription(lesson.content);
  }, [course]);
  function onChangeEditor(e) {
    setDescription(e.target.value);
  }

  function onChangeName(e) {
    setName(e.target.value);
  }
  function onChangePrice(e) {
    setPrice(e.target.value);
  }

  function onSubmit(e) {
    console.log(user);
    e.preventDefault();
    setSubmit(true);

    const payload = {
      name,
      description,
      price,
      instructorId: user.id,
    };

    dispatch(
      editCourse(course.id, user.id, payload, (response) => {
        console.log(response);
        setSubmit(false);
        navigate(`/dashboard/instructor`);
      })
    );
  }
  return (
    <form className={classes.container} onSubmit={(e) => onSubmit(e)}>
      <Box sx={{ textAlign: 'left', marginBottom: '1rem' }}>
        <Link to="/dashboard/instructor">
          <Button size="small" variant="outlined" startIcon={<KeyboardBackspaceIcon />}>
            Back
          </Button>
        </Link>
      </Box>
      <div className={classes.formCover}>
        <div className={classes.cover}>
          <label id="add-img-label" htmlFor="add-single-img">
            Add Cover
          </label>
        </div>
        <div className={classes.name}>
          <label htmlFor="courseName">
            Edit Course Name
            <br />
            <Input
              placeholder="Javascript - From Hero to Zero  "
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
      <div className={classes.price}>
        <label htmlFor="coursePrice">Price</label>
        <Input
          defaultValue="Hello world"
          inputProps={ariaLabel}
          type="number"
          id="coursePrice"
          value={price}
          onChange={(e) => onChangePrice(e)}
          required
        />
      </div>
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
          {submit ? 'Updating' : 'Update'}
        </Button>
      </Box>
    </form>
  );
};
InstructorEditCourse.propTypes = {
  user: PropTypes.object,
  courses: PropTypes.array,
};
const mapStateToProps = createStructuredSelector({
  user: selectUser,
  courses: selectCoursesByInstructor,
});
export default connect(mapStateToProps)(InstructorEditCourse);
