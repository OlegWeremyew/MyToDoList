import { LoadingStatuses } from '../../enums';
import { todolistEnumReducer } from '../constants';
import { ActionTodolistTypes, TodolistDomainType } from '../types';

const initialTodoListState: Array<TodolistDomainType> = [];

export const todolistsReducer = (
  state: Array<TodolistDomainType> = initialTodoListState,
  action: ActionTodolistTypes,
): Array<TodolistDomainType> => {
  switch (action.type) {
    case todolistEnumReducer.REMOVE_TODOLIST: {
      return state.filter(tl => tl.id !== action.payload.id);
    }
    case todolistEnumReducer.ADD_TODOLIST: {
      return [
        { ...action.payload.todolist, filter: 'all', entityStatus: LoadingStatuses.Idle },
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
        entityStatus: LoadingStatuses.Idle,
      }));
    }
    default:
      return state;
  }
};
