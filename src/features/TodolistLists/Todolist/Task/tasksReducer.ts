import { Dispatch } from 'redux';

import { todolistAPI } from '../../../../api/todolistAPI/todolistApi';
import { TaskType, TodolistType, UpdateTaskModelType } from '../../../../api/types';
import { ActionAppTypes, AppAction } from '../../../../App/AppReducer/AppReducer';
import { AppRootStateType, InferActionTypes } from '../../../../App/store';
import { ResultCodes, TaskPriorities, TaskStatuses } from '../../../../enums';
import { LoadingStatuses } from '../../../enums';
import { TasksStateType } from '../../TodolistList';
import { ActionTodolistTypes, todolistEnumReducer } from '../../todolistsReducer';

import { handleServerAppError, handleServerNetworkError } from 'utils';

const initialState: TasksStateType = {};

export enum taskEnumReducer {
  REMOVE_TASK = 'TODOLIST/TASK_REDUCER/REMOVE_TASK',
  ADD_TASK = 'TODOLIST/TASK_REDUCER/ADD_TASK',
  UPDATE_TASK = 'TODOLIST/TASK_REDUCER/UPDATE_TASK',
  SET_TASKS = 'TODOLIST/TASK_REDUCER/SET-TASKS',
}

export const tasksReducer = (
  state: TasksStateType = initialState,
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

export const taskAction = {
  removeTaskAC(taskId: string, todolistId: string) {
    return {
      type: taskEnumReducer.REMOVE_TASK,
      payload: {
        taskId,
        todolistId,
      },
    } as const;
  },
  addTaskAC(task: TaskType) {
    return {
      type: taskEnumReducer.ADD_TASK,
      payload: {
        task,
      },
    } as const;
  },
  updateTaskAC(taskId: string, model: UpdateDomainTaskModelType, todolistId: string) {
    return {
      type: taskEnumReducer.UPDATE_TASK,
      payload: {
        model,
        todolistId,
        taskId,
      },
    } as const;
  },
  setTasksAC(tasks: Array<TaskType>, todolistId: string) {
    return {
      type: taskEnumReducer.SET_TASKS,
      payload: {
        tasks,
        todolistId,
      },
    } as const;
  },
};

// Thunk===================================================================================
export const fetchTasksTC = (todolistId: string) => (dispatch: ThunkDispatchType) => {
  dispatch(AppAction.setAppStatusAC(LoadingStatuses.Loading));
  todolistAPI.getTasks(todolistId).then(res => {
    const tasks = res.data.items;
    dispatch(taskAction.setTasksAC(tasks, todolistId));
    dispatch(AppAction.setAppStatusAC(LoadingStatuses.Succeeded));
  });
};

export const removeTaskTC =
  (taskId: string, todolistId: string) => (dispatch: ThunkDispatchType) => {
    dispatch(AppAction.setAppStatusAC(LoadingStatuses.Loading));
    todolistAPI.deleteTask(todolistId, taskId).then(() => {
      dispatch(taskAction.removeTaskAC(taskId, todolistId));
      dispatch(AppAction.setAppStatusAC(LoadingStatuses.Succeeded));
    });
  };

export const addTaskTC =
  (todolistId: string, title: string) => (dispatch: ThunkDispatchType) => {
    dispatch(AppAction.setAppStatusAC(LoadingStatuses.Loading));
    todolistAPI
      .createTask(todolistId, title)
      .then(res => {
        if (res.data.resultCode === ResultCodes.Success) {
          const task = res.data.data.item;
          dispatch(taskAction.addTaskAC(task));
          dispatch(AppAction.setAppStatusAC(LoadingStatuses.Succeeded));
        } else {
          handleServerAppError(res.data, dispatch);
        }
      })
      .catch(err => {
        handleServerNetworkError(err, dispatch);
      });
  };

export const updateTaskTC =
  (taskId: string, todolistId: string, domainModel: UpdateDomainTaskModelType) =>
  (dispatch: ThunkDispatchType, getState: () => AppRootStateType) => {
    const allTasksFromState = getState().tasks;
    const tasksForCurrentTodolist = allTasksFromState[todolistId];
    const task = tasksForCurrentTodolist.find(t => t.id === taskId);

    if (task) {
      const apiModel: UpdateTaskModelType = {
        title: task.title,
        startDate: task.startDate,
        priority: task.priority,
        description: task.description,
        deadline: task.deadline,
        status: task.status,
        ...domainModel,
      };
      todolistAPI
        .updateTask(todolistId, taskId, apiModel)
        .then(res => {
          if (res.data.resultCode === ResultCodes.Success) {
            dispatch(taskAction.updateTaskAC(taskId, domainModel, todolistId));
          } else {
            handleServerAppError(res.data, dispatch);
          }
        })
        .catch(err => {
          handleServerNetworkError(err, dispatch);
        });
    }
  };

// types===============================================
export type ThunkDispatchType = Dispatch<ActionsTaskAllType | ActionAppTypes>;

type ActionsTaskAllType = ActionTaskTypes | ActionTodolistTypes;

export type UpdateDomainTaskModelType = {
  title?: string;
  description?: string;
  status?: TaskStatuses;
  priority?: TaskPriorities;
  startDate?: string;
  deadline?: string;
};

export type ActionTaskTypes = InferActionTypes<typeof taskAction>;
