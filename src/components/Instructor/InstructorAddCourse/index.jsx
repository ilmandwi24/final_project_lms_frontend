/* eslint-disable jsx-a11y/label-has-associated-control */
import { Box, Button, FormControl, Input, InputLabel, TextField } from '@mui/material';
import Editor from 'react-simple-wysiwyg';
import { useState } from 'react';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { selectUser } from '@containers/App/selectors';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import classes from './style.module.scss';

const ariaLabel = { 'aria-label': 'description' };

const InstructorAddCourse = ({ user }) => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState('');
  const [submit, setSubmit] = useState(false);
  const urlHost = process.env.NODE_ENV !== 'production' ? 'http://localhost:8080' : process.env.API_HOST;

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
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${user.token}`,
    };
    axios
      .post(`${urlHost}/api/courses/add`, payload, { headers })
      .then((r) => {
        setSubmit(false);
        // setValidationErrors({});
        console.log(r);
        // const userData = {
        //   email: r.data.data.email,
        //   name: r.data.data.name,
        //   token: r.data.data.token,
        // };
        // dispatch(setUser(userData));
        // dispatch(setLogin(true));
        // setNotif({ success: 'login success' });
        // // localStorage.setItem('token', r.data.token);
        // navigate('/dashboard/profile');
      })
      .catch((error) => {
        console.log(error);
        setSubmit(false);
        if (error.response.data.error !== undefined) {
          // setValidationErrors({ message: error.response.data.message });
          // console;
          console.log(error.response);
        }
      });
    console.log(name, description);
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
            Course Name
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
          {submit ? 'Submitting...' : 'Submit'}
        </Button>
      </Box>
    </form>
  );
};
InstructorAddCourse.propTypes = {
  user: PropTypes.object,
};
const mapStateToProps = createStructuredSelector({
  user: selectUser,
});
export default connect(mapStateToProps)(InstructorAddCourse);
