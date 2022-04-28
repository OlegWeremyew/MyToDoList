import { Nullable } from '../../../types/Nullable';
import { appEnumReducer } from '../constants';
import { RequestStatusType } from '../types';

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
