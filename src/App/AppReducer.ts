import { Dispatch } from 'redux';

import { authAPI } from '../api/todolistApi';
import { authAction } from '../features/Login/authReducer';
import { Nullable } from '../types/Nullable';

import { InferActionTypes } from './store';

export const initialState = {
  status: 'idle' as RequestStatusType,
  error: null,
  isInitialized: false,
};

export enum appEnumReducer {
  SET_STATUS = 'TODOLIST/APP_REDUCER/SET-STATUS',
  SET_ERROR = 'TODOLIST/APP_REDUCER/SET_ERROR',
  SET_INITIALIZED = 'TODOLIST/APP_REDUCER/SET_INITIALIZED',
}

export const appReducer = (
  state: InitialStateType = initialState,
  action: ActionAppTypes,
): InitialStateType => {
  switch (action.type) {
    case appEnumReducer.SET_STATUS:
      return { ...state, status: action.payload.status };
    case appEnumReducer.SET_ERROR:
      return { ...state, error: action.payload.error };
    case appEnumReducer.SET_INITIALIZED:
      return { ...state, isInitialized: action.payload.isInitialized };
    default:
      return state;
  }
};

// ActionCreators=============================
export const AppAction = {
  setAppErrorAC(error: Nullable<string>) {
    return {
      type: appEnumReducer.SET_ERROR,
      payload: {
        error,
      },
    } as const;
  },
  setAppStatusAC(status: RequestStatusType) {
    return {
      type: appEnumReducer.SET_STATUS,
      payload: {
        status,
      },
    } as const;
  },
  setInitializedAC(isInitialized: boolean) {
    return {
      type: appEnumReducer.SET_INITIALIZED,
      payload: {
        isInitialized,
      },
    } as const;
  },
};

// thunk
export const initializeAppTC = () => (dispatch: Dispatch) => {
  authAPI
    .me()
    .then(res => {
      if (res.data.resultCode === 0) {
        dispatch(authAction.setIsLoggedInAC(true));
      }
    })
    .finally(() => {
      dispatch(AppAction.setInitializedAC(true));
    });
};

// Types ========================================================

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed';

export type InitialStateType = {
  status: RequestStatusType;
  error: Nullable<string>;
  isInitialized: boolean;
};

export type ActionAppTypes = InferActionTypes<typeof AppAction>;
