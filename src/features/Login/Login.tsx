import React from 'react';

import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import FormLabel from '@material-ui/core/FormLabel';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

import { LoginParamsType } from '../../api/types';
import { EMPTY_STRING, MIN_PASSWORD_LENGTH } from '../../constants';
import { ErrorValues, PATH } from '../../enums';
import { ReturnComponentType } from '../../types/ReturnComponentType';

import { loginTC } from './loginThunk';

import { getIsLoggedInSelector } from 'selectors/authSelectors/authSelectors';

export const Login: React.FC = (): ReturnComponentType => {
  const isLoggedIn: boolean = useSelector(getIsLoggedInSelector);
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      email: EMPTY_STRING,
      password: EMPTY_STRING,
      rememberMe: false,
    },
    validate: values => {
      const errors: Partial<Omit<LoginParamsType, 'captcha'>> = {};
      if (!values.email) {
        errors.email = ErrorValues.REQUIRED_EMAIL;
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = ErrorValues.INVALID_ADDRESS;
      }
      if (!values.password) {
        errors.password = ErrorValues.REQUIRED_PASSWORD;
      } else if (values.password.length < MIN_PASSWORD_LENGTH) {
        errors.password = ErrorValues.PASSWORD_LENGTH;
      }
      return errors;
    },
    onSubmit: values => {
      dispatch(loginTC(values));
      formik.resetForm();
    },
  });

  if (isLoggedIn) {
    return <Navigate to={PATH.MAIN_WINDOW} />;
  }

  return (
    <Grid container justifyContent="center">
      <Grid item justifyContent="center">
        <FormControl>
          <FormLabel>
            <p>
              <span>To log in get registered </span>
              <a
                href="https://social-network.samuraijs.com/"
                target="_blank"
                rel="noreferrer"
              >
                here
              </a>
            </p>
            <p>or use common test account credentials:</p>
            <p>Email: free@samuraijs.com</p>
            <p>Password: free</p>
          </FormLabel>
          <form onSubmit={formik.handleSubmit}>
            <FormGroup>
              <TextField
                label="Email"
                margin="normal"
                {...formik.getFieldProps('email')}
              />
              {formik.touched.email && formik.errors.email && (
                <div style={{ color: 'red' }}>{formik.errors.email}</div>
              )}
              <TextField
                label="Password"
                type="password"
                margin="normal"
                {...formik.getFieldProps('password')}
              />
              {formik.touched.password && formik.errors.password && (
                <div style={{ color: 'red' }}>{formik.errors.password}</div>
              )}
              <FormControlLabel
                label="Remember me"
                control={<Checkbox {...formik.getFieldProps('rememberMe')} />}
              />
              <Button type="submit" variant="contained" color="primary">
                Login
              </Button>
            </FormGroup>
          </form>
        </FormControl>
      </Grid>
    </Grid>
  );
};
