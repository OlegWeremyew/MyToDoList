import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk from 'redux-thunk';

import { tasksReducer } from '../features/TodolistLists/Todolist/Task/tasksReducer';
import { todolistsReducer } from '../features/TodolistLists/todolistsReducer';

import { appReducer } from './AppReducer/AppReducer/AppReducer';

import { authReducer } from 'features/Login/loginReducer/authReducer';

export type AppRootStateType = ReturnType<typeof rootReducer>;

const rootReducer = combineReducers({
  tasks: tasksReducer,
  todolists: todolistsReducer,
  app: appReducer,
  auth: authReducer,
});

export const store = createStore(rootReducer, applyMiddleware(thunk));

export type PropertiesTypes<T> = T extends { [key: string]: infer U } ? U : never;

export type InferActionTypes<T extends { [key: string]: (...args: any[]) => any }> =
  ReturnType<PropertiesTypes<T>>;

// @ts-ignore
window.store = store;
