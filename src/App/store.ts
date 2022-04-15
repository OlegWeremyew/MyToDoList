import {tasksReducer} from '../features/TodolistList/tasksReducer';
import {todolistsReducer} from '../features/TodolistList/todolistsReducer';
import {applyMiddleware, combineReducers, createStore} from 'redux';
import thunk from "redux-thunk";
import {appReducer} from "./AppReducer";
import {authReducer} from "../features/Login/authReducer";

export type AppRootStateType = ReturnType<typeof rootReducer>

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer,
    app: appReducer,
    auth: authReducer,
})

export const store = createStore(rootReducer, applyMiddleware(thunk));

export type PropertiesTypes<T> = T extends { [key: string]: infer U } ? U : never

export type InferActionTypes<T extends { [key: string]: (...args: any[]) => any }> = ReturnType<PropertiesTypes<T>>

// @ts-ignore
window.store = store;
