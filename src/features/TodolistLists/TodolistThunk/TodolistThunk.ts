import { todolistAPI } from '../../../api';
import { AppAction } from '../../../App';
import { LoadingStatuses } from '../../enums';
import { ActionTodolist } from '../TodolistAction';
import { ThunkDispatchType } from '../types';

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
