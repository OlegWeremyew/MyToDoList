import { AxiosResponse } from 'axios';

import { instance } from '../apiConfig';
import {
  GetTasksResponse,
  TaskType,
  TodolistType,
  UpdateTaskModelType,
  ResponseType,
} from '../types';

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
