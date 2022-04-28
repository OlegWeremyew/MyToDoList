import { LoadingStatuses } from '../../../features/enums';
import { appEnumReducer } from '../constants';
import { ActionAppTypes, InitialAppStateType, RequestStatusType } from '../types';

export const initialAppState = {
  status: LoadingStatuses.Idle as RequestStatusType,
  error: null,
  isInitialized: false,
};

export const appReducer = (
  state: InitialAppStateType = initialAppState,
  action: ActionAppTypes,
): InitialAppStateType => {
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
