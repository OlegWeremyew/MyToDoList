import {tasksReducer} from '../features/TodolistList/tasksReducer';
import {todolistsReducer} from '../features/TodolistList/todolistsReducer';
import {combineReducers} from 'redux';
import thunkMiddleware from "redux-thunk";
import {appReducer} from "./AppReducer";
import {authReducer} from "../features/Login/authReducer";
import {configureStore} from "@reduxjs/toolkit";

export type AppRootStateType = ReturnType<typeof rootReducer>
export type RootReducerType = typeof rootReducer

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer,
    app: appReducer,
    auth: authReducer,
})

//export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));
export const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware().prepend(thunkMiddleware),
})

// @ts-ignore
window.store = store;
