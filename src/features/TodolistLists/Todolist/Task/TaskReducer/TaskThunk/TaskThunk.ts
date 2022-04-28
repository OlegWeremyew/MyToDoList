import { todolistAPI } from '../../../../../../api/todolistAPI/todolistApi';
import { UpdateTaskModelType } from '../../../../../../api/types';
import { AppAction } from '../../../../../../App/AppReducer';
import { AppRootStateType } from '../../../../../../App/store';
import { ResultCodes } from '../../../../../../enums';
import { handleServerAppError, handleServerNetworkError } from '../../../../../../utils';
import { LoadingStatuses } from '../../../../../enums';
import { taskAction } from '../TaskAction';
import { ThunkDispatchType, UpdateDomainTaskModelType } from '../types';

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
