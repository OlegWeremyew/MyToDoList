import {todolistAPI, TodolistType} from "../../api/todolistApi";
import {Dispatch} from "redux";
import {ActionAppTypes, AppAction, RequestStatusType} from "../../App/AppReducer";

const initialState: Array<TodolistDomainType> = []

export enum todolistEnumReducer {
    REMOVE_TODOLIST = 'TODOLIST/TODOLIST_REDUCER/REMOVE-TODOLIST',
    ADD_TODOLIST = 'TODOLIST/TODOLIST_REDUCER/ADD_TODOLIST',
    CHANGE_TODOLIST_TITLE = 'TODOLIST/TODOLIST_REDUCER/CHANGE-TODOLIST-TITLE',
    CHANGE_TODOLIST_FILTER = 'TODOLIST/TODOLIST_REDUCER/CHANGE_TODOLIST_FILTER',
    CHANGE_TODOLIST_ENTITY_STATUS = 'TODOLIST/TODOLIST_REDUCER/CHANGE_TODOLIST_ENTITY_STATUS',
    SET_TODOS = 'TODOLIST/TODOLIST_REDUCER/SET_TODOS',
}

export const todolistsReducer = (state: Array<TodolistDomainType> = initialState, action: ActionsType): Array<TodolistDomainType> => {
    switch (action.type) {
        case todolistEnumReducer.REMOVE_TODOLIST: {
            return state
                .filter(tl => tl.id !== action.payload.id)
        }
        case todolistEnumReducer.ADD_TODOLIST: {
            return [{...action.payload.todolist, filter: 'all', entityStatus: "idle"}, ...state]
        }
        case todolistEnumReducer.CHANGE_TODOLIST_TITLE: {
            return state
                .map(m => m.id === action.payload.id
                    ? {...m, title: action.payload.title}
                    : m)
        }
        case todolistEnumReducer.CHANGE_TODOLIST_FILTER: {
            return state
                .map(m => m.id === action.payload.id
                    ? {...m, filter: action.payload.filter}
                    : m)
        }
        case todolistEnumReducer.CHANGE_TODOLIST_ENTITY_STATUS: {
            return state
                .map(m => m.id === action.payload.id
                    ? {...m, entityStatus: action.payload.status}
                    : m)
        }
        case todolistEnumReducer.SET_TODOS: {
            return action.payload.todos
                .map(m => ({...m, filter: "all", entityStatus: "idle"}))
        }
        default:
            return state;
    }
}

export type RemoveTodolistActionType = ReturnType<typeof removeTodolistAC>
export const removeTodolistAC = (todolistId: string) => {
    return {
        type: todolistEnumReducer.REMOVE_TODOLIST,
        payload: {
            id: todolistId,
        }
    } as const
}

export type AddTodolistActionType = ReturnType<typeof addTodolistAC>
export const addTodolistAC = (todolist: TodolistType) => {
    return {
        type: todolistEnumReducer.ADD_TODOLIST,
        payload: {
            todolist,
        }
    } as const
}

export type ChangeTodolistTitleActionType = ReturnType<typeof changeTodolistTitleAC>
export const changeTodolistTitleAC = (id: string, title: string) => {
    return {
        type: todolistEnumReducer.CHANGE_TODOLIST_TITLE,
        payload: {
            id: id,
            title: title,
        }
    } as const
}

export type ChangeTodolistFilterActionType = ReturnType<typeof changeTodolistFilterAC>
export const changeTodolistFilterAC = (id: string, filter: FilterValuesType) => {
    return {
        type: todolistEnumReducer.CHANGE_TODOLIST_FILTER,
        payload: {
            id: id,
            filter: filter,
        }
    } as const
}

export type setTodosActionType = ReturnType<typeof setTodosAC>
export const setTodosAC = (todos: Array<TodolistType>) => {
    return {
        type: todolistEnumReducer.SET_TODOS,
        payload: {
            todos,
        },
    } as const
}

export type changeTodolistEntityStatusType = ReturnType<typeof changeTodolistEntityStatusAC>
export const changeTodolistEntityStatusAC = (id: string, status: RequestStatusType) => {
    return {
        type: todolistEnumReducer.CHANGE_TODOLIST_ENTITY_STATUS,
        payload: {
            id,
            status,
        },
    } as const
}

// Thunk=============================================================
export const fetchTodolistsTC = () => (dispatch: ThunkDispatchType) => {
    dispatch(AppAction.setAppStatusAC("loading"))
    todolistAPI.getTodos()
        .then(res => {
            dispatch(setTodosAC(res.data))
            dispatch(AppAction.setAppStatusAC("succeeded"))
        })
}

export const removeTodolistTC = (todolistId: string) => (dispatch: ThunkDispatchType) => {
    dispatch(AppAction.setAppStatusAC("loading"))
    dispatch(changeTodolistEntityStatusAC(todolistId, "loading"))
    todolistAPI.deleteTodo(todolistId)
        .then(res => {
            dispatch(removeTodolistAC(todolistId))
            dispatch(AppAction.setAppStatusAC("succeeded"))
        })
}

export const addTodolistTC = (title: string) => (dispatch: ThunkDispatchType) => {
    dispatch(AppAction.setAppStatusAC("loading"))
    todolistAPI.createTodo(title)
        .then(res => {
            dispatch(addTodolistAC(res.data.data.item))
            dispatch(AppAction.setAppStatusAC("succeeded"))
        })
}

export const ChangeTodolistTitleTC = (id: string, title: string) => (dispatch: ThunkDispatchType) => {
    dispatch(AppAction.setAppStatusAC("loading"))
    todolistAPI.updateTodoTitle(id, title)
        .then(res => {
            dispatch(changeTodolistTitleAC(id, title))
            dispatch(AppAction.setAppStatusAC("succeeded"))
        })
}

//types

type ActionsType =
    | RemoveTodolistActionType
    | AddTodolistActionType
    | ChangeTodolistTitleActionType
    | ChangeTodolistFilterActionType
    | setTodosActionType
    | changeTodolistEntityStatusType


export type FilterValuesType = "all" | "active" | "completed";

export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
    entityStatus: RequestStatusType
}

export type ThunkDispatchType = Dispatch<ActionsType | ActionAppTypes>