import {tasksReducer} from '../TodolistList/tasksReducer';
import {todolistsReducer} from '../TodolistList/todolistsReducer';
import {applyMiddleware, combineReducers, createStore} from 'redux';
import thunk from "redux-thunk";
import {appReducer} from "./AppReducer";

export type AppRootStateType = ReturnType<typeof rootReducer>

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer,
    app: appReducer,
})

export const store = createStore(rootReducer, applyMiddleware(thunk));

// @ts-ignore
window.store = store;
