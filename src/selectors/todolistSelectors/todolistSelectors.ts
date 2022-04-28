import { AppRootStateType } from '../../App/store';
import { TodolistDomainType } from '../../features/TodolistLists/types';

export const getTodoLists = (state: AppRootStateType): Array<TodolistDomainType> =>
  state.todolists;
