import { Dispatch } from 'redux';

import { todolistAPI } from '../../api/todolistAPI/todolistApi';
import { TodolistType } from '../../api/types';
import { ActionAppTypes, AppAction, RequestStatusType } from '../../App/AppReducer';
import { InferActionTypes } from '../../App/store';
import { LoadingStatuses } from '../enums';

const initialState: Array<TodolistDomainType> = [];

export enum todolistEnumReducer {
  REMOVE_TODOLIST = 'TODOLIST/TODOLIST_REDUCER/REMOVE-TODOLIST',
  ADD_TODOLIST = 'TODOLIST/TODOLIST_REDUCER/ADD_TODOLIST',
  CHANGE_TODOLIST_TITLE = 'TODOLIST/TODOLIST_REDUCER/CHANGE-TODOLIST-TITLE',
  CHANGE_TODOLIST_FILTER = 'TODOLIST/TODOLIST_REDUCER/CHANGE_TODOLIST_FILTER',
  CHANGE_TODOLIST_ENTITY_STATUS = 'TODOLIST/TODOLIST_REDUCER/CHANGE_TODOLIST_ENTITY_STATUS',
  SET_TODOS = 'TODOLIST/TODOLIST_REDUCER/SET_TODOS',
}

export const todolistsReducer = (
  state: Array<TodolistDomainType> = initialState,
  action: ActionTodolistTypes,
): Array<TodolistDomainType> => {
  switch (action.type) {
    case todolistEnumReducer.REMOVE_TODOLIST: {
      return state.filter(tl => tl.id !== action.payload.id);
    }
    case todolistEnumReducer.ADD_TODOLIST: {
      return [
        { ...action.payload.todolist, filter: 'all', entityStatus: 'idle' },
        ...state,
      ];
    }
    case todolistEnumReducer.CHANGE_TODOLIST_TITLE: {
      return state.map(m =>
        m.id === action.payload.id ? { ...m, title: action.payload.title } : m,
      );
    }
    case todolistEnumReducer.CHANGE_TODOLIST_FILTER: {
      return state.map(m =>
        m.id === action.payload.id ? { ...m, filter: action.payload.filter } : m,
      );
    }
    case todolistEnumReducer.CHANGE_TODOLIST_ENTITY_STATUS: {
      return state.map(m =>
        m.id === action.payload.id ? { ...m, entityStatus: action.payload.status } : m,
      );
    }
    case todolistEnumReducer.SET_TODOS: {
      return action.payload.todos.map(m => ({
        ...m,
        filter: 'all',
        entityStatus: 'idle',
      }));
    }
    default:
      return state;
  }
};

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

// Thunk=============================================================
export const fetchTodolistsTC = () => (dispatch: ThunkDispatchType) => {
  dispatch(AppAction.setAppStatusAC(LoadingStatuses.Loading));
  todolistAPI.getTodos().then(res => {
    dispatch(ActionTodolist.setTodosAC(res.data));
    dispatch(AppAction.setAppStatusAC(LoadingStatuses.Succeeded));
  });
};

export const removeTodolistTC = (todolistId: string) => (dispatch: ThunkDispatchType) => {
  dispatch(AppAction.setAppStatusAC(LoadingStatuses.Loading));
  dispatch(
    ActionTodolist.changeTodolistEntityStatusAC(todolistId, LoadingStatuses.Loading),
  );
  todolistAPI.deleteTodo(todolistId).then(() => {
    dispatch(ActionTodolist.removeTodolistAC(todolistId));
    dispatch(AppAction.setAppStatusAC(LoadingStatuses.Succeeded));
  });
};

export const addTodolistTC = (title: string) => (dispatch: ThunkDispatchType) => {
  dispatch(AppAction.setAppStatusAC(LoadingStatuses.Loading));
  todolistAPI.createTodo(title).then(res => {
    dispatch(ActionTodolist.addTodolistAC(res.data.data.item));
    dispatch(AppAction.setAppStatusAC(LoadingStatuses.Succeeded));
  });
};

export const ChangeTodolistTitleTC =
  (id: string, title: string) => (dispatch: ThunkDispatchType) => {
    dispatch(AppAction.setAppStatusAC(LoadingStatuses.Loading));
    todolistAPI.updateTodoTitle(id, title).then(() => {
      dispatch(ActionTodolist.changeTodolistTitleAC(id, title));
      dispatch(AppAction.setAppStatusAC(LoadingStatuses.Succeeded));
    });
  };

// types

export type FilterValuesType = 'all' | 'active' | 'completed';

export type TodolistDomainType = TodolistType & {
  filter: FilterValuesType;
  entityStatus: RequestStatusType;
};

export type ThunkDispatchType = Dispatch<ActionTodolistTypes | ActionAppTypes>;

export type ActionTodolistTypes = InferActionTypes<typeof ActionTodolist>;
