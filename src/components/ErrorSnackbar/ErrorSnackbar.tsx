import * as React from 'react';
import { FC, forwardRef } from 'react';

import { AlertProps, Snackbar } from '@material-ui/core';
import MuiAlert from '@material-ui/core/Alert';
import { useDispatch, useSelector } from 'react-redux';

import { AppAction } from '../../App';

import { getError } from 'selectors/appSelectors/appSelectors';

const Alert = forwardRef<HTMLDivElement, AlertProps>((props, ref) => (
  <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
));

export const ErrorSnackbar: FC = () => {
  const dispatch = useDispatch();

  const error = useSelector(getError);

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
