import { TodolistType } from '../../../api/types';
import { RequestStatusType } from '../../../App/AppReducer/types';
import { todolistEnumReducer } from '../constants';
import { FilterValuesType } from '../types';

export const ActionTodolist = {
  removeTodolistAC(todolistId: string) {
    return {
      type: todolistEnumReducer.REMOVE_TODOLIST,
      payload: {
        id: todolistId,
      },
    } as const;
  },
  addTodolistAC(todolist: TodolistType) {
    return {
      type: todolistEnumReducer.ADD_TODOLIST,
      payload: {
        todolist,
      },
    } as const;
  },
  changeTodolistTitleAC(id: string, title: string) {
    return {
      type: todolistEnumReducer.CHANGE_TODOLIST_TITLE,
      payload: {
        id,
        title,
      },
    } as const;
  },
  changeTodolistFilterAC(id: string, filter: FilterValuesType) {
    return {
      type: todolistEnumReducer.CHANGE_TODOLIST_FILTER,
      payload: {
        id,
        filter,
      },
    } as const;
  },
  setTodosAC(todos: Array<TodolistType>) {
    return {
      type: todolistEnumReducer.SET_TODOS,
      payload: {
        todos,
      },
    } as const;
  },
  changeTodolistEntityStatusAC(id: string, status: RequestStatusType) {
    return {
      type: todolistEnumReducer.CHANGE_TODOLIST_ENTITY_STATUS,
      payload: {
        id,
        status,
      },
    } as const;
  },
};
