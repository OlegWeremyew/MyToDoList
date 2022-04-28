import { RequestStatusType } from '../../App/AppReducer/types';
import { AppRootStateType } from '../../App/store';
import { Nullable } from '../../types/Nullable';

export const getIsInitializedSelector = (state: AppRootStateType): boolean =>
  state.app.isInitialized;

export const getStatus = (state: AppRootStateType): RequestStatusType => state.app.status;

export const getError = (state: AppRootStateType): Nullable<string> => state.app.error;
