import {Dispatch} from "redux";
import {authAPI} from "../api/todolistApi";
import {setIsLoggedInAC} from "../features/Login/authReducer";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export const initialState = {
    status: 'idle' as RequestStatusType,
    error: null,
    isInitialized: false,
}

const slice = createSlice({
    name: "App",
    initialState: initialState,
    reducers: {
        setAppStatusAC(state, action: PayloadAction<{ status: RequestStatusType }>) {
            state.status = action.payload.status
        },
        setAppErrorAC(state, action: PayloadAction<{ error: any}>) {
            state.error = action.payload.error
        },
        setInitializedAC(state, action: PayloadAction<{ isInitialized: boolean }>) {
            state.isInitialized = action.payload.isInitialized
        },
    }
})

export const {setAppStatusAC, setAppErrorAC, setInitializedAC} = slice.actions

export const appReducer = slice.reducer

//thunk
export const initializeAppTC = () => (dispatch: Dispatch) => {
    authAPI.me()
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(setIsLoggedInAC({value: true}))
            } else {

            }
        })
        .finally(() => {
            dispatch(setInitializedAC({isInitialized: true}))
        })
}

//Types ========================================================

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
