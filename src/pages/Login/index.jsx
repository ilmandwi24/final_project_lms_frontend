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
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { setUser } from '@containers/App/actions';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { selectLogin } from '@containers/Client/selectors';
import { setLogin } from '@containers/Client/actions';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { signInWithPopup } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import classes from './style.module.scss';
import { auth, googleProvider } from '../../utils/firebaseHelper';

const Login = () => {
  const [notif, setNotif] = useState({});
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const isLogin = useSelector(selectLogin);
  const [isSubmitting, setIsSubmitting] = useState(false); // const [error, setError] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState('');
  const location = useLocation();
  const urlHost = process.env.NODE_ENV !== 'production' ? 'http://localhost:8080' : process.env.API_HOST;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    // Retrieve state data if it exists and save it to local state
    if (location.state?.notif) {
      setNotif({ success: location.state.notif });
      // console.log(notif);
    }
  }, [location.state]);

  useEffect(() => {
    if (isLogin) {
      navigate('/dashboard');
    }
  }, [isLogin]);
  const handleEmail = (e) => {
    setEmail(e.target.value);
    setIsSubmitting(false);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
    setIsSubmitting(false);
  };
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const loginAction = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const payload = {
      email,
      password,
    };

    axios
      .post(`${urlHost}/api/user/login`, payload)
      .then((r) => {
        setIsSubmitting(false);
        setValidationErrors({});
        console.log(r);
        const userData = {
          id: r.data.data.id,
          email: r.data.data.email,
          name: r.data.data.name,
          token: r.data.data.token,
        };
        dispatch(setUser(userData));
        dispatch(setLogin(true));
        setNotif({ success: 'login success' });
        // localStorage.setItem('token', r.data.token);
        navigate('/dashboard/profile');
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

  const [user] = useAuthState(auth);
  console.log('user---', user);
  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      console.log(user.displayName);
      const payload = {
        email: user.email,
        name: user.displayName,
        register_type: 'google',
      };
      axios
        .post(`${urlHost}/api/user/login-by-google`, payload)
        .then((r) => {
          setIsSubmitting(false);
          setValidationErrors({});

          const userData = {
            email: r.data.data[0].email,
            name: r.data.data[0].name,
            token: r.data.data[0].token,
          };
          console.log(userData);
          dispatch(setUser(userData));
          dispatch(setLogin(true));
          setNotif({ success: 'login success' });
          // localStorage.setItem('token', r.data.token);
          navigate('/dashboard/profile');
        })
        .catch((error) => {
          console.log(error);
          setIsSubmitting(false);
          if (error.response.data.error !== undefined) {
            setValidationErrors({ message: error.response.data.message });
            console;
          }
        });
    } catch (error) {
      console.error('Error signing in with Google:', error);
    }
  };
  return (
    <form className={classes.container} onSubmit={(e) => loginAction(e)}>
      <h3 style={{ margin: '0rem', textDecoration: 'underline' }}>Sign In</h3>
      {notif.success && (
        <Alert
          severity="success"
          onClose={() => {
            setNotif({});
          }}
        >
          {notif.success}
        </Alert>
      )}
      {console.log(user)}
      <TextField id="outlined-basic" label="Email" variant="outlined" type="email" onChange={handleEmail} required />
      <FormControl variant="outlined" onChange={handlePassword} required>
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
      <FormGroup>
        {/* <FormControlLabel control={<Checkbox defaultChecked />} label="Label" /> */}
        <FormControlLabel required control={<Checkbox />} label="I accept the Terms and Conditions" />
        {/* <FormControlLabel disabled control={<Checkbox />} label="Disabled" /> */}
      </FormGroup>
      <Button variant="contained" sx={{ textTransform: 'none' }} disabled={isSubmitting} type="submit">
        {isSubmitting ? 'Signing In...' : 'Sign In'}
      </Button>
      <div style={{ height: '.1rem', borderBottom: '1px solid hsl(0, 0%, 50%)' }} />

      <Button variant="contained" color="error" sx={{ textTransform: 'none' }} onClick={signInWithGoogle}>
        <FaGoogle /> <span style={{ marginLeft: '.5rem' }}>Sign in with Google</span>
      </Button>
    </form>
  );
};

export default Login;
