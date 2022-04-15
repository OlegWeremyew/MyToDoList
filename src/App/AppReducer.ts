import {Dispatch} from "redux";
import {authAPI} from "../api/todolistApi";
import {setIsLoggedInAC} from "../features/Login/authReducer";
import {Nullable} from "../types/Nullable";

export const initialState = {
    status: 'idle'as RequestStatusType,
    error: null,
    isInitialized: false,
}

export enum appEnumReducer {
    SET_STATUS = 'TODOLIST/APP_REDUCER/SET-STATUS',
    SET_ERROR = 'TODOLIST/APP_REDUCER/SET_ERROR',
    SET_INITIALIZED = 'TODOLIST/APP_REDUCER/SET_INITIALIZED',
}

export const appReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case appEnumReducer.SET_STATUS:
            return {...state, status: action.payload.status}
        case appEnumReducer.SET_ERROR:
            return {...state, error: action.payload.error}
        case appEnumReducer.SET_INITIALIZED:
            return {...state, isInitialized: action.payload.isInitialized}
        default:
            return state
    }
}

//ActionCreators=============================
export type setAppErrorActionType = ReturnType<typeof setAppErrorAC>
export const setAppErrorAC = (error: Nullable<string>) => {
    return {
        type: appEnumReducer.SET_ERROR,
        payload: {
            error,
        },
    } as const
}

export type setAppStatusActionType = ReturnType<typeof setAppStatusAC>
export const setAppStatusAC = (status: RequestStatusType) => {
    return {
        type: appEnumReducer.SET_STATUS,
        payload: {
            status,
        },
    } as const
}

export type setInitializedActionType = ReturnType<typeof setInitializedAC>
export const setInitializedAC = (isInitialized: boolean) => {
    return {
        type: appEnumReducer.SET_INITIALIZED,
        payload: {
            isInitialized,
        },
    } as const
}

//thunk
export const initializeAppTC = () => (dispatch: Dispatch) => {
    authAPI.me()
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(setIsLoggedInAC(true));
            } else {

            }
        })
        .finally(() => {
            dispatch(setInitializedAC(true))
        })
}

//Types ========================================================

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

export type InitialStateType = {
    status: RequestStatusType,
    error: Nullable<string>,
    isInitialized: boolean,
}

type ActionsType = setAppStatusActionType | setAppErrorActionType | setInitializedActionType