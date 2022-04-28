import { TodolistType } from '../../../../../../api/types';
import { todolistEnumReducer } from '../../../../constants';
import { TasksStateType } from '../../../../TodolistList';
import { taskEnumReducer } from '../constants';
import { ActionsTaskAllType } from '../types';

const initialTaskState: TasksStateType = {};

export const tasksReducer = (
  state: TasksStateType = initialTaskState,
  action: ActionsTaskAllType,
): TasksStateType => {
  switch (action.type) {
    case taskEnumReducer.REMOVE_TASK: {
      return {
        ...state,
        [action.payload.todolistId]: state[action.payload.todolistId].filter(
          f => f.id !== action.payload.taskId,
        ),
      };
    }
    case taskEnumReducer.ADD_TASK: {
      return {
        ...state,
        [action.payload.task.todoListId]: [
          action.payload.task,
          ...state[action.payload.task.todoListId],
        ],
      };
    }
    case taskEnumReducer.UPDATE_TASK: {
      return {
        ...state,
        [action.payload.todolistId]: state[action.payload.todolistId].map(m =>
          m.id === action.payload.taskId ? { ...m, ...action.payload.model } : m,
        ),
      };
    }
    case todolistEnumReducer.ADD_TODOLIST: {
      return {
        ...state,
        [action.payload.todolist.id]: [],
      };
    }
    case todolistEnumReducer.REMOVE_TODOLIST: {
      const copyState = { ...state };
      delete copyState[action.payload.id];
      return copyState;
    }
    case todolistEnumReducer.SET_TODOS: {
      const stateCopy = { ...state };
      action.payload.todos.forEach((todolist: TodolistType) => {
        stateCopy[todolist.id] = [];
      });
      return stateCopy;
    }
    case taskEnumReducer.SET_TASKS: {
      return { ...state, [action.payload.todolistId]: action.payload.tasks };
    }
    default:
      return state;
  }
};
