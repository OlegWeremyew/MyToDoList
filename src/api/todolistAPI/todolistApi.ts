import { instance } from '../apiConfig';
import {
  GetTasksResponse,
  TodolistType,
  UpdateTaskModelType,
  ResponseType,
} from '../types';

import { CreateTaskType, CreateToDo, TasksPutOrPostType } from './types';

export const todolistAPI = {
  getTodos() {
    const endPoint = `todo-lists/`;
    return instance.get<TodolistType[]>(endPoint);
  },

  createTodo(title: string) {
    const endPoint = `todo-lists/`;
    return instance.post<CreateToDo>(endPoint, { title });
  },

  updateTodoTitle(todolistId: string, title: string) {
    const endPoint = `todo-lists/${todolistId}`;
    return instance.put<ResponseType>(endPoint, { title });
  },

  deleteTodo(todolistId: string) {
    const endPoint = `todo-lists/${todolistId}`;
    return instance.delete<ResponseType>(endPoint);
  },

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
    return instance.post<CreateTaskType, TasksPutOrPostType>(endPoint, { title });
  },

  updateTask(todolistId: string, taskId: string, model: UpdateTaskModelType) {
    const endPoint = `todo-lists/${todolistId}/tasks/${taskId}`;
    return instance.put<UpdateTaskModelType, TasksPutOrPostType>(endPoint, model);
  },
};
