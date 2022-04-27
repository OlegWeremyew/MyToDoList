import { AxiosResponse } from 'axios';

import { instance } from './apiConfig';
import {
  GetTasksResponse,
  LoginParamsType,
  TaskType,
  TodolistType,
  UpdateTaskModelType,
  ResponseType,
  ResponseMeType,
} from './types';

export const todolistAPI = {
  // todolist =============================
  getTodos(): Promise<AxiosResponse<TodolistType[]>> {
    const endPoint = `todo-lists/`;
    return instance.get<TodolistType[]>(endPoint);
  },

  createTodo(title: string) {
    const endPoint = `todo-lists/`;
    return instance.post<ResponseType<{ item: TodolistType }>>(endPoint, { title });
  },

  updateTodoTitle(todolistId: string, title: string) {
    const endPoint = `todo-lists/${todolistId}`;
    return instance.put<ResponseType>(endPoint, { title });
  },

  deleteTodo(todolistId: string) {
    const endPoint = `todo-lists/${todolistId}`;
    return instance.delete<ResponseType>(endPoint);
  },

  // tasks =============================
  getTasks(todolistId: string) {
    const endPoint = `todo-lists/${todolistId}/tasks/`;
    return instance.get<GetTasksResponse>(endPoint);
  },

  deleteTask(todolistId: string, taskId: string) {
    const endPoint = `todo-lists/${todolistId}/tasks/${taskId}`;
    return instance.delete<ResponseType>(endPoint);
  },

  createTask(todolistId: string, title: string) {
    const endPoint = `todo-lists/${todolistId}/tasks/`;
    return instance.post<
      { title: string },
      AxiosResponse<ResponseType<{ item: TaskType }>>
    >(endPoint, { title });
  },

  updateTask(todolistId: string, taskId: string, model: UpdateTaskModelType) {
    const endPoint = `todo-lists/${todolistId}/tasks/${taskId}`;
    return instance.put<
      UpdateTaskModelType,
      AxiosResponse<ResponseType<{ item: TaskType }>>
    >(endPoint, model);
  },
};

export const authAPI = {
  login(data: LoginParamsType) {
    const endPoint = '/auth/login';
    return instance.post<
      LoginParamsType,
      AxiosResponse<ResponseType<{ userId: number }>>
    >(endPoint, data);
  },
  me() {
    const endPoint = '/auth/me';
    return instance.get<ResponseType<{ data: ResponseMeType }>>(endPoint);
  },
  logout() {
    const endPoint = '/auth/login';
    return instance.delete<ResponseType>(endPoint);
  },
};
