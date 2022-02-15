import {setAppErrorAC, setAppErrorActionType, setAppStatusAC, setAppStatusActionType} from "../App/AppReducer";
import {ResponseType} from "../api/todolistApi";
import {Dispatch} from 'redux'

export const handleServerAppError = <D>(data: ResponseType<D>, dispatch: Dispatch<setAppStatusActionType | setAppErrorActionType>) => {
    if (data.messages.length) {
        dispatch(setAppErrorAC(data.messages[0]))
    } else {
        dispatch(setAppErrorAC("Some error"))
    }
    dispatch(setAppStatusAC("failed"))
}

export const handleServerNetworkError = (err: { message: string }, dispatch: Dispatch<setAppStatusActionType | setAppErrorActionType>) => {
    dispatch(setAppErrorAC(err.message ? err.message : "Some error"))
    dispatch(setAppStatusAC("failed"))
}