import { Dispatch } from 'redux';

import { authAPI } from '../../api/authAPI/authAPI';
import { LoginParamsType } from '../../api/types';
import { AppAction } from '../../App/AppReducer';
import { ResultCodes } from '../../enums';

import { authEnumReducer } from './constants';
import { AuthReducerActionsType, InitialAuthStateType } from './types';

import { handleServerAppError, handleServerNetworkError } from 'utils';

export const initialAuthState = {
  isLoggedIn: false,
};

export const authReducer = (
  state: InitialAuthStateType = initialAuthState,
  action: AuthReducerActionsType,
): InitialAuthStateType => {
  switch (action.type) {
    case authEnumReducer.SET_IS_LOGGED_IN:
      return { ...state, isLoggedIn: action.payload.value };
    default:
      return state;
  }
};

export const authAction = {
  setIsLoggedInAC(value: boolean) {
    return {
      type: authEnumReducer.SET_IS_LOGGED_IN,
      payload: { value },
    } as const;
  },
};

// thunks
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
