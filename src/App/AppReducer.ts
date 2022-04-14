import {Dispatch} from "redux";
import {authAPI} from "../api/todolistApi";
import {setIsLoggedInAC} from "../features/Login/authReducer";

export const initialState = {
    status: 'idle'as RequestStatusType,
    error: null,
    isInitialized: false,
}

export const appReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.payload.status}
        case 'APP/SET-ERROR':
            return {...state, error: action.payload.error}
        case 'APP/SET-INITIALIZED':
            return {...state, isInitialized: action.payload.isInitialized}
        default:
            return state
    }
}

//ActionCreators=============================
export type setAppErrorActionType = ReturnType<typeof setAppErrorAC>
export const setAppErrorAC = (error: string | null) => {
    return {
        type: 'APP/SET-ERROR',
        payload: {
            error,
        },
    } as const
}

export type setAppStatusActionType = ReturnType<typeof setAppStatusAC>
export const setAppStatusAC = (status: RequestStatusType) => {
    return {
        type: 'APP/SET-STATUS',
        payload: {
            status,
        },
    } as const
}

export type setInitializedActionType = ReturnType<typeof setInitializedAC>
export const setInitializedAC = (isInitialized: boolean) => {
    return {
        type: 'APP/SET-INITIALIZED',
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
    error: string | null,
    isInitialized: boolean,
}

type ActionsType = setAppStatusActionType | setAppErrorActionType | setInitializedActionType