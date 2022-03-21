import {setAppErrorAC,  setAppStatusAC} from "../App/AppReducer";
import {ResponseType} from "../api/todolistApi";
import {Dispatch} from 'redux'

export const handleServerAppError = <D>(data: ResponseType<D>, dispatch: Dispatch) => {
    if (data.messages.length) {
        dispatch(setAppErrorAC({error: data.messages[0]}))
    } else {
        dispatch(setAppErrorAC({error: "Some error"}))
    }
    dispatch(setAppStatusAC({status: "failed"}))
}

export const handleServerNetworkError = (err: { message: string }, dispatch: Dispatch) => {
    dispatch(setAppErrorAC({error: err.message ? err.message : "Some error"}))
    dispatch(setAppStatusAC({status: "failed"}))
}