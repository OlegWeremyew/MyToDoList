import { AppRootStateType } from 'App/types';
import { TasksStateType } from 'features/TodolistLists/types';

export const getTaskSelector = (state: AppRootStateType): TasksStateType => state.tasks;
