import { AxiosResponse } from 'axios';

import { ResponseType, TaskType, TodolistType } from '../../types';

export type TasksPutOrPostType = AxiosResponse<ResponseType<{ item: TaskType }>>;

export type CreateTaskType = { title: string };

export type CreateToDo = ResponseType<{ item: TodolistType }>;
