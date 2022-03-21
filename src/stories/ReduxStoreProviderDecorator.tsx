import {Provider} from "react-redux";
import {combineReducers} from "redux";
import {tasksReducer} from "../features/TodolistList/tasksReducer";
import {todolistsReducer} from "../features/TodolistList/todolistsReducer";
import {AppRootStateType, RootReducerType} from "../App/store";
import {v1} from "uuid";
import {TaskPriorities, TaskStatuses} from "../api/todolistApi";
import {appReducer} from "../App/AppReducer";
import thunkMiddleware from "redux-thunk";
import {authReducer} from "../features/Login/authReducer";
import React from "react";
import {configureStore} from "@reduxjs/toolkit";


const rootReducer: RootReducerType = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer,
    app: appReducer,
    auth: authReducer,
})

const initialGlobalState: AppRootStateType = {
    todolists: [
        {id: "todolistId1", title: "What to learn", filter: "all", addedDate: "", order: 0, entityStatus: "idle"},
        {id: "todolistId2", title: "What to buy", filter: "all", addedDate: "", order: 1, entityStatus: "loading"},
    ],
    tasks: {
        ["todolistId1"]: [
            {
                id: v1(),
                title: "HTML&CSS",
                status: TaskStatuses.Completed,
                priority: TaskPriorities.Low,
                startDate: "",
                deadline: "",
                todoListId: "todolistId1",
                order: 0,
                addedDate: "",
                description: "",
            },
            {
                id: v1(),
                title: "JS",
                status: TaskStatuses.Completed,
                priority: TaskPriorities.Low,
                startDate: "",
                deadline: "",
                todoListId: "todolistId1",
                order: 0,
                addedDate: "",
                description: "",
            },
        ],
        ["todolistId2"]: [
            {
                id: v1(),
                title: "Bread",
                status: TaskStatuses.Completed,
                priority: TaskPriorities.Low,
                startDate: "",
                deadline: "",
                todoListId: "todolistId2",
                order: 0,
                addedDate: "",
                description: "",
            },
            {
                id: v1(),
                title: "JS",
                status: TaskStatuses.Completed,
                priority: TaskPriorities.Low,
                startDate: "",
                deadline: "",
                todoListId: "todolistId2",
                order: 0,
                addedDate: "",
                description: "",
            },
        ],
    },
    app: {
        status: "succeeded",
        error: null,
        isInitialized: true,
    },
    auth: {
        isLoggedIn: false,
    },
}

//export const storyBookStore = createStore(rootReducer, initialGlobalState, applyMiddleware(thunk))
export const storyBookStore = configureStore({
    reducer: rootReducer,
    preloadedState: initialGlobalState,
    middleware: getDefaultMiddleware => getDefaultMiddleware().prepend(thunkMiddleware),
})


export const ReduxStoreProviderDecorator = (storyFn: () => React.ReactNode) => {
    return <Provider store={storyBookStore}>
        {storyFn()}
    </Provider>
}
