import { LoadingStatuses } from '../../../features/enums';
import { Nullable } from '../../../types/Nullable';
import { InferActionTypes } from '../../store';
import { AppAction } from '../AppAction';

export type RequestStatusType =
  | LoadingStatuses.Succeeded
  | LoadingStatuses.Idle
  | LoadingStatuses.Failed
  | LoadingStatuses.Loading;

export type InitialAppStateType = {
  status: RequestStatusType;
  error: Nullable<string>;
  isInitialized: boolean;
};

export type ActionAppTypes = InferActionTypes<typeof AppAction>;
