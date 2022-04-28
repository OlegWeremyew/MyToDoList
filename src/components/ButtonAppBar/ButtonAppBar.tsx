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

import { RequestStatusType } from '../../App/AppReducer/types';
import { ReturnComponentType } from '../../types/ReturnComponentType';

import { logoutTC } from 'features/Login';
import { getStatus } from 'selectors/appSelectors/appSelectors';
import { getIsLoggedInSelector } from 'selectors/authSelectors/authSelectors';

export const ButtonAppBar = (): ReturnComponentType => {
  const dispatch = useDispatch();

  const status: RequestStatusType = useSelector(getStatus);
  const isLoggedIn: boolean = useSelector(getIsLoggedInSelector);

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
