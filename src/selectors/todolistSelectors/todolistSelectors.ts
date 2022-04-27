import { AppRootStateType } from '../../App/store';
import { TodolistDomainType } from '../../features/TodolistLists/todolistsReducer';

export const getTodoLists = (state: AppRootStateType): Array<TodolistDomainType> =>
  state.todolists;
