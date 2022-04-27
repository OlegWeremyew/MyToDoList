import { Dispatch } from 'redux';

import { ResponseType } from '../api/types';
import { ActionAppTypes, AppAction } from '../App/AppReducer';
import { FIRST_ELEMENT_IN_ARRAY } from '../constants';

export const handleServerAppError = <D>(
  data: ResponseType<D>,
  dispatch: Dispatch<ActionAppTypes>,
): void => {
  if (data.messages.length) {
    dispatch(AppAction.setAppErrorAC(data.messages[FIRST_ELEMENT_IN_ARRAY]));
  } else {
    dispatch(AppAction.setAppErrorAC('Some error'));
  }
  dispatch(AppAction.setAppStatusAC('failed'));
};

export const handleServerNetworkError = (
  err: { message: string },
  dispatch: Dispatch<ActionAppTypes>,
): void => {
  dispatch(AppAction.setAppErrorAC(err.message ? err.message : 'Some error'));
  dispatch(AppAction.setAppStatusAC('failed'));
};
