import {Dispatch} from 'redux'
import {authAPI, LoginParamsType} from "../../api/todolistApi";
import {handleServerAppError, handleServerNetworkError} from "../../utils/errorUtils";
import {ActionAppTypes, AppAction} from "../../App/AppReducer";
import {InferActionTypes} from "../../App/store";

const initialState = {
    isLoggedIn: false,
}

export enum authEnumReducer {
    SET_IS_LOGGED_IN = 'TODOLIST/AUTH_REDUCER/SET_IS_LOGGED_IN',
}

export const authReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case authEnumReducer.SET_IS_LOGGED_IN:
            return {...state, isLoggedIn: action.payload.value}
        default:
            return state
    }
}

export const authAction = {
    setIsLoggedInAC(value: boolean) {
        return {
            type: authEnumReducer.SET_IS_LOGGED_IN,
            payload: {value},
        } as const
    }

}

// thunks
export const loginTC = (data: LoginParamsType) => (dispatch: Dispatch<ActionsType>) => {
    dispatch(AppAction.setAppStatusAC('loading'))
    authAPI.login(data)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(authAction.setIsLoggedInAC(true))
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
                dispatch(authAction.setIsLoggedInAC(false))
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

type ActionsType = ActionAuthTypes | ActionAppTypes

export type ActionAuthTypes = InferActionTypes<typeof authAction>
