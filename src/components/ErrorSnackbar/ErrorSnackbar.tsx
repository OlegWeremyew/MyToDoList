import * as React from 'react';

import { AlertProps, Snackbar } from '@material-ui/core';
import MuiAlert from '@material-ui/core/Alert';
import { useDispatch, useSelector } from 'react-redux';

import { AppAction } from '../../App/AppReducer';
import { AppRootStateType } from '../../App/store';
import { Nullable } from '../../types/Nullable';
import { ReturnComponentType } from '../../types/ReturnComponentType';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>((props, ref) => (
  <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
));

export const ErrorSnackbar = (): ReturnComponentType => {
  const dispatch = useDispatch();

  const error = useSelector<AppRootStateType, Nullable<string>>(state => state.app.error);

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string): void => {
    if (reason === 'clickaway') {
      return;
    }
    dispatch(AppAction.setAppErrorAC(null));
  };

  const isOpen = error !== null;

  return (
    <Snackbar open={isOpen} autoHideDuration={6000} onClose={handleClose}>
      <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
        {error}
      </Alert>
    </Snackbar>
  );
};
