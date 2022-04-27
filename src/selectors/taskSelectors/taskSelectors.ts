import { AppRootStateType } from '../../App/store';
import { TasksStateType } from '../../features/TodolistLists/TodolistList';

export const getTaskSelector = (state: AppRootStateType): TasksStateType => state.tasks;
