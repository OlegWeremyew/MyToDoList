export const initialState = {
    status: 'idle'as RequestStatusType,
    error: null,
}

export const appReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.payload.status}
        case 'APP/SET-ERROR':
            return {...state, error: action.payload.error}
        default:
            return state
    }
}

//ActionCreators=============================
export type setErrorActionType = ReturnType<typeof setAppErrorAC>
export const setAppErrorAC = (error: string | null) => {
    return {
        type: 'APP/SET-ERROR',
        payload: {
            error,
        },
    } as const
}

export type setStatusActionType = ReturnType<typeof setAppStatusAC>
export const setAppStatusAC = (status: RequestStatusType) => {
    return {
        type: 'APP/SET-STATUS',
        payload: {
            status,
        },
    } as const
}

//Types ========================================================
export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

export type InitialStateType = {
    status: RequestStatusType,
    error: string | null
}

type ActionsType = setStatusActionType | setErrorActionType