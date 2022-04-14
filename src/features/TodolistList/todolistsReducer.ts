import {todolistAPI, TodolistType} from "../../api/todolistApi";
import {Dispatch} from "redux";
import {RequestStatusType, setAppStatusAC, setAppStatusActionType} from "../../App/AppReducer";

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


const initialState: Array<TodolistDomainType> = []

export const todolistsReducer = (state: Array<TodolistDomainType> = initialState, action: ActionsType): Array<TodolistDomainType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return state
                .filter(tl => tl.id !== action.payload.id)
        }
        case 'ADD-TODOLIST': {
            return [{...action.payload.todolist, filter: 'all', entityStatus: "idle"}, ...state]
        }
        case 'CHANGE-TODOLIST-TITLE': {
            return state
                .map(m => m.id === action.payload.id
                    ? {...m, title: action.payload.title}
                    : m)
        }
        case 'CHANGE-TODOLIST-FILTER': {
            return state
                .map(m => m.id === action.payload.id
                    ? {...m, filter: action.payload.filter}
                    : m)
        }
        case "CHANGE_TODOLIST_ENTITY_STATUS": {
            return state
                .map(m => m.id === action.payload.id
                    ? {...m, entityStatus: action.payload.status}
                    : m)
        }
        case "SET-TODOS": {
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
        type: 'REMOVE-TODOLIST',
        payload: {
            id: todolistId,
        }
    } as const
}

export type AddTodolistActionType = ReturnType<typeof addTodolistAC>
export const addTodolistAC = (todolist: TodolistType) => {
    return {
        type: 'ADD-TODOLIST',
        payload: {
            todolist,
        }
    } as const
}

export type ChangeTodolistTitleActionType = ReturnType<typeof changeTodolistTitleAC>
export const changeTodolistTitleAC = (id: string, title: string) => {
    return {
        type: 'CHANGE-TODOLIST-TITLE',
        payload: {
            id: id,
            title: title,
        }
    } as const
}

export type ChangeTodolistFilterActionType = ReturnType<typeof changeTodolistFilterAC>
export const changeTodolistFilterAC = (id: string, filter: FilterValuesType) => {
    return {
        type: 'CHANGE-TODOLIST-FILTER',
        payload: {
            id: id,
            filter: filter,
        }
    } as const
}

export type setTodosActionType = ReturnType<typeof setTodosAC>
export const setTodosAC = (todos: Array<TodolistType>) => {
    return {
        type: "SET-TODOS",
        payload: {
            todos,
        },
    } as const
}

export type changeTodolistEntityStatusType = ReturnType<typeof changeTodolistEntityStatusAC>
export const changeTodolistEntityStatusAC = (id: string, status: RequestStatusType) => {
    return {
        type: "CHANGE_TODOLIST_ENTITY_STATUS",
        payload: {
            id,
            status,
        },
    } as const
}

// Thunk=============================================================
export const fetchTodolistsTC = () => (dispatch: ThunkDispatchType) => {
    dispatch(setAppStatusAC("loading"))
    todolistAPI.getTodos()
        .then(res => {
            dispatch(setTodosAC(res.data))
            dispatch(setAppStatusAC("succeeded"))
        })
}

export const removeTodolistTC = (todolistId: string) => (dispatch: ThunkDispatchType) => {
    dispatch(setAppStatusAC("loading"))
    dispatch(changeTodolistEntityStatusAC(todolistId, "loading"))
    todolistAPI.deleteTodo(todolistId)
        .then(res => {
            dispatch(removeTodolistAC(todolistId))
            dispatch(setAppStatusAC("succeeded"))
        })
}

export const addTodolistTC = (title: string) => (dispatch: ThunkDispatchType) => {
    dispatch(setAppStatusAC("loading"))
    todolistAPI.createTodo(title)
        .then(res => {
            dispatch(addTodolistAC(res.data.data.item))
            dispatch(setAppStatusAC("succeeded"))
        })
}

export const ChangeTodolistTitleTC = (id: string, title: string) => (dispatch: ThunkDispatchType) => {
    dispatch(setAppStatusAC("loading"))
    todolistAPI.updateTodoTitle(id, title)
        .then(res => {
            dispatch(changeTodolistTitleAC(id, title))
            dispatch(setAppStatusAC("succeeded"))
        })
}

export type ThunkDispatchType = Dispatch<ActionsType | setAppStatusActionType>