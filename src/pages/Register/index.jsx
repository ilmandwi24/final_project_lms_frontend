import {
  Alert,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
} from '@mui/material';
import { FaGoogle } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '@containers/App/actions';
import { useNavigate } from 'react-router-dom';
import { selectLogin } from '@containers/Client/selectors';
import classes from './style.module.scss';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState('');
  const [validationErrors, setValidationErrors] = useState({});
  // States for checking the errors
  const [isSubmitting, setIsSubmitting] = useState(false); // const [error, setError] = useState(false);
  const urlHost = process.env.NODE_ENV !== 'production' ? 'http://localhost:8080' : process.env.API_HOST;
  const isLogin = useSelector(selectLogin);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLogin) {
      navigate('/dashboard');
    }
  }, [isLogin]);
  // Handling the name change
  const handleName = (e) => {
    setName(e.target.value);
    setIsSubmitting(false);
  };

  // Handling the email change
  const handleEmail = (e) => {
    setEmail(e.target.value);
    setIsSubmitting(false);
  };

  // Handling the password change
  const handlePassword = (e) => {
    setPassword(e.target.value);
    setIsSubmitting(false);
  };
  const handleConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);

    setIsSubmitting(false);
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const registerAction = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const payload = {
      name,
      email,
      password,
    };
    if (password !== confirmPassword) {
      setValidationErrors({ message: 'Passwords do not match' });
      setIsSubmitting(false);
      return;
    }
    axios
      .post(`${urlHost}/api/user/register`, payload)
      .then((r) => {
        setIsSubmitting(false);
        setValidationErrors({});
        // const user = {
        //   email: r.data.email,
        //   name: r.data.name,
        //   token: r.data.token,
        // };
        // dispatch(setUser(user));

        // localStorage.setItem('token', r.data.token);
        navigate('/login', { state: { notif: 'register success' } });
      })
      .catch((error) => {
        console.log(error);
        setIsSubmitting(false);
        if (error.response.data.error !== undefined) {
          setValidationErrors({ message: error.response.data.message });
          console;
        }
      });
  };

  useEffect(() => {
    console.log(process.env.API_URL);
  });
  return (
    <form className={classes.container} onSubmit={(e) => registerAction(e)}>
      <h3 style={{ margin: '0rem', textDecoration: 'underline' }}>Sign Up</h3>
      {validationErrors.message && (
        <Alert variant="filled" severity="error">
          {validationErrors.message}
        </Alert>
      )}
      {/* <hr /> */}
      <TextField id="outlined-basic" label="Name" variant="outlined" type="text" onChange={handleName} required />
      <TextField id="outlined-basic" label="Email" variant="outlined" type="email" onChange={handleEmail} required />

      <FormControl variant="outlined" onChange={handleConfirmPassword} required>
        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
        <OutlinedInput
          id="outlined-adornment-password"
          type={showPassword ? 'text' : 'password'}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
          label="Password"
        />
      </FormControl>
      <FormControl variant="outlined" onChange={handlePassword} required>
        <InputLabel htmlFor="outlined-adornment-confirm-password">Confirm Password</InputLabel>
        <OutlinedInput
          id="outlined-adornment-confirm-password"
          type={showPassword ? 'text' : 'password'}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
          label="Confirm Password"
        />
      </FormControl>
      <FormGroup>
        {/* <FormControlLabel control={<Checkbox defaultChecked />} label="Label" /> */}
        <FormControlLabel required control={<Checkbox />} label="I accept the Terms and Conditions" />
        {/* <FormControlLabel disabled control={<Checkbox />} label="Disabled" /> */}
      </FormGroup>
      <Button variant="contained" sx={{ textTransform: 'none' }} disabled={isSubmitting} type="submit">
        {isSubmitting ? 'Signing up...' : 'Sign Up'}
      </Button>
      {/* <div style={{ height: '0.1rem', borderBottom: '1px solid hsl(0, 0%, 50%)' }} /> */}

      {/* <Button variant="contained" color="error" sx={{ textTransform: 'none' }}>
        <FaGoogle /> <span style={{ marginLeft: '0.5rem' }}>Sign up with Google</span>
      </Button> */}
    </form>
  );
};

export default Register;
