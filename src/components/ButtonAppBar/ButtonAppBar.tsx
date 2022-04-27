import * as React from 'react';

import {
  AppBar,
  Box,
  Button,
  IconButton,
  LinearProgress,
  Toolbar,
  Typography,
} from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';

import { RequestStatusType } from '../../App/AppReducer';
import { AppRootStateType } from '../../App/store';
import { logoutTC } from '../../features/Login/authReducer';
import { getIsLoggedInSelector, getStatus } from '../../selectors/appSelectors';
import { ReturnComponentType } from '../../types/ReturnComponentType';

export const ButtonAppBar = (): ReturnComponentType => {
  const dispatch = useDispatch();

  const status = useSelector<AppRootStateType, RequestStatusType>(getStatus);
  const isLoggedIn = useSelector<AppRootStateType, boolean>(getIsLoggedInSelector);

  const logoutHandler = (): void => {
    dispatch(logoutTC());
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Todolist
          </Typography>
          {isLoggedIn && (
            <Button variant="outlined" onClick={logoutHandler} color="inherit">
              Logout
            </Button>
          )}
        </Toolbar>
        {status === 'loading' && <LinearProgress />}
      </AppBar>
    </Box>
  );
};
