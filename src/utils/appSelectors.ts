import {AppRootStateType} from "../App/store";

export const getIsInitializedSelector = (state: AppRootStateType) => {
    return state.app.isInitialized
}

export const getIsLoggedInSelector = (state: AppRootStateType) => {
    return state.auth.isLoggedIn
}

export const getTaskSelector = (state: AppRootStateType) => {
    return state.tasks
}

export const getTodoLists = (state: AppRootStateType) => {
    return state.todolists
}