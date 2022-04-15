import {Dispatch} from 'redux'
import {authAPI, LoginParamsType} from "../../api/todolistApi";
import {handleServerAppError, handleServerNetworkError} from "../../utils/errorUtils";
import {ActionAppTypes, AppAction} from "../../App/AppReducer";

const initialState = {
    isLoggedIn: false,
}

export enum authEnumReducer {
    SET_IS_LOGGED_IN = 'TODOLIST/AUTH_REDUCER/SET_IS_LOGGED_IN',
}

export const authReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case authEnumReducer.SET_IS_LOGGED_IN:
            return {...state, isLoggedIn: action.value}
        default:
            return state
    }
}

// actions
export type setIsLoggedInType = ReturnType<typeof setIsLoggedInAC>
export const setIsLoggedInAC = (value: boolean) =>
    ({type: authEnumReducer.SET_IS_LOGGED_IN, value} as const)

// thunks
export const loginTC = (data: LoginParamsType) => (dispatch: Dispatch<ActionsType>) => {
    dispatch(AppAction.setAppStatusAC('loading'))
    authAPI.login(data)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(setIsLoggedInAC(true))
                dispatch(AppAction.setAppStatusAC("succeeded"))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch((err) => {
            handleServerNetworkError(err, dispatch)
        })
}

export const logoutTC = () => (dispatch: Dispatch) => {
    authAPI.logout()
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(setIsLoggedInAC(false))
                dispatch(AppAction.setAppStatusAC("succeeded"))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch((err) => {
            handleServerNetworkError(err, dispatch)
        })
}

// types

type InitialStateType = typeof initialState

type ActionsType = setIsLoggedInType | ActionAppTypes
