import { Dispatch } from 'redux';

import { ResponseType } from '../api/types';
import { AppAction } from '../App/AppReducer/AppAction/AppAction';
import { ActionAppTypes } from '../App/AppReducer/types';
import { FIRST_ELEMENT_IN_ARRAY } from '../constants';
import { LoadingStatuses } from '../features/enums';

export const handleServerAppError = <D>(
  data: ResponseType<D>,
  dispatch: Dispatch<ActionAppTypes>,
): void => {
  if (data.messages.length) {
    dispatch(AppAction.setAppErrorAC(data.messages[FIRST_ELEMENT_IN_ARRAY]));
  } else {
    dispatch(AppAction.setAppErrorAC('Some error'));
  }
  dispatch(AppAction.setAppStatusAC(LoadingStatuses.Failed));
};

export const handleServerNetworkError = (
  err: { message: string },
  dispatch: Dispatch<ActionAppTypes>,
): void => {
  dispatch(AppAction.setAppErrorAC(err.message ? err.message : 'Some error'));
  dispatch(AppAction.setAppStatusAC(LoadingStatuses.Failed));
};
