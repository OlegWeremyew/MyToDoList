import { AppRootStateType } from 'App/types';
import { TodolistDomainType } from 'features/TodolistLists/types';

export const getTodoLists = (state: AppRootStateType): Array<TodolistDomainType> =>
  state.todoLists;
