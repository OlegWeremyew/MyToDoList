import { RequestStatusType } from '../App/AppReducer';
import { AppRootStateType } from '../App/store';
import { TasksStateType } from '../features/TodolistLists/TodolistList';
import { TodolistDomainType } from '../features/TodolistLists/todolistsReducer';

export const getIsInitializedSelector = (state: AppRootStateType): boolean =>
  state.app.isInitialized;

export const getIsLoggedInSelector = (state: AppRootStateType): boolean =>
  state.auth.isLoggedIn;

export const getTaskSelector = (state: AppRootStateType): TasksStateType => state.tasks;

export const getTodoLists = (state: AppRootStateType): Array<TodolistDomainType> =>
  state.todolists;

export const getStatus = (state: AppRootStateType): RequestStatusType => state.app.status;
