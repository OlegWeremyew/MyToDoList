import {ActionAppTypes, AppAction} from "../App/AppReducer";
import {ResponseType} from "../api/todolistApi";
import {Dispatch} from 'redux'

export const handleServerAppError = <D>(data: ResponseType<D>, dispatch: Dispatch<ActionAppTypes>) => {
    if (data.messages.length) {
        dispatch(AppAction.setAppErrorAC(data.messages[0]))
    } else {
        dispatch(AppAction.setAppErrorAC("Some error"))
    }
    dispatch(AppAction.setAppStatusAC("failed"))
}

export const handleServerNetworkError = (err: { message: string }, dispatch: Dispatch<ActionAppTypes>) => {
    dispatch(AppAction.setAppErrorAC(err.message ? err.message : "Some error"))
    dispatch(AppAction.setAppStatusAC("failed"))
}