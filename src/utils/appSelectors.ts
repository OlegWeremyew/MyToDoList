import { AppRootStateType } from '../App/store';
import { TasksStateType } from '../features/TodolistList/TodolistList';
import { TodolistDomainType } from '../features/TodolistList/todolistsReducer';

export const getIsInitializedSelector = (state: AppRootStateType): boolean =>
  state.app.isInitialized;

export const getIsLoggedInSelector = (state: AppRootStateType): boolean =>
  state.auth.isLoggedIn;

export const getTaskSelector = (state: AppRootStateType): TasksStateType => state.tasks;

export const getTodoLists = (state: AppRootStateType): Array<TodolistDomainType> =>
  state.todolists;
