import { Dispatch } from 'redux';

import { authAPI } from '../../../api/authAPI/authAPI';
import { LoginParamsType } from '../../../api/types';
import { AppAction } from '../../../App/AppReducer';
import { ResultCodes } from '../../../enums';
import { handleServerAppError, handleServerNetworkError } from '../../../utils';
import { authAction } from '../loginActions';
import { AuthReducerActionsType } from '../types';

export const loginTC =
  (data: LoginParamsType) => (dispatch: Dispatch<AuthReducerActionsType>) => {
    dispatch(AppAction.setAppStatusAC('loading'));
    authAPI
      .login(data)
      .then(res => {
        if (res.data.resultCode === ResultCodes.Success) {
          dispatch(authAction.setIsLoggedInAC(true));
          dispatch(AppAction.setAppStatusAC('succeeded'));
        } else {
          handleServerAppError(res.data, dispatch);
        }
      })
      .catch(err => {
        handleServerNetworkError(err, dispatch);
      });
  };

export const logoutTC = () => (dispatch: Dispatch) => {
  authAPI
    .logout()
    .then(res => {
      if (res.data.resultCode === ResultCodes.Success) {
        dispatch(authAction.setIsLoggedInAC(false));
        dispatch(AppAction.setAppStatusAC('succeeded'));
      } else {
        handleServerAppError(res.data, dispatch);
      }
    })
    .catch(err => {
      handleServerNetworkError(err, dispatch);
    });
};
