import {v1} from 'uuid';
import {todolistAPI, TodolistType} from "../api/todolistApi";
import {Dispatch} from "redux";

type ActionsType =
    | RemoveTodolistActionType
    | AddTodolistActionType
    | ChangeTodolistTitleActionType
    | ChangeTodolistFilterActionType
    | setTodosActionType

export type FilterValuesType = "all" | "active" | "completed";

export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
}


const initialState: Array<TodolistDomainType> = []

export const todolistsReducer = (state: Array<TodolistDomainType> = initialState, action: ActionsType): Array<TodolistDomainType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return state.filter(tl => tl.id !== action.payload.id)
        }
        case 'ADD-TODOLIST': {
            return [
                {
                    id: action.payload.todolistId,
                    title: action.payload.title,
                    filter: 'all',
                    addedDate: "",
                    order: 0,
                }
                , ...state]
        }
        case 'CHANGE-TODOLIST-TITLE': {
            return state.map(m => m.id === action.payload.id ? {...m, title: action.payload.title} : m)
        }
        case 'CHANGE-TODOLIST-FILTER': {
            return state.map(m => m.id === action.payload.id ? {...m, filter: action.payload.filter} : m)
        }
        case "SET-TODOS": {
            return action.payload.todos.map(m => ({...m, filter: "all"}))
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
export const addTodolistAC = (title: string) => {
    return {
        type: 'ADD-TODOLIST',
        payload: {
            title: title,
            todolistId: v1(),
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

// Thunk
export const fetchTodolistsThunk = () => (dispatch: Dispatch) => {
    todolistAPI.getTodos()
        .then(res => {
            dispatch(setTodosAC(res.data))
        })
}

