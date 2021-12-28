import {FilterValuesType, TodolistType} from "../App";
import {v1} from "uuid";

export const todolistsReducer = (state: Array<TodolistType>, action: ActionType): Array<TodolistType> => {
    switch (action.type) {
        case "REMOVE-TODOLIST" : {
            return state.filter(f => f.id !== action.id)
        }
        case "ADD-TODOLIST" : {
            let newTodolistId = v1()
            return [{id: newTodolistId, title: action.title, filter: 'all'}, ...state]
        }
        case "CHANGE-TODOLIST-TITLE" : {
            return state.map(m => m.id === action.id ? {...m, title: action.title} : m)
        }
        case "CHANGE-TODOLIST-FILTER" : {
            return state.map(m => m.id === action.id ? {...m, filter: action.filter} : m)
        }
        default:
            return state
    }
}

type ActionType = removeTodolistACType | addTodolistACType | changeTodolistTitleAC | changeFilterTodolistACType

type removeTodolistACType = ReturnType<typeof removeTodolistAC>
export const removeTodolistAC = (id: string) => {
    return {
        type: "REMOVE-TODOLIST",
        id,
    } as const
}


type addTodolistACType = ReturnType<typeof addTodolistAC>
export const addTodolistAC = (title: string) => {
    return {
        type: "ADD-TODOLIST",
        title,
    } as const
}


type changeTodolistTitleAC = ReturnType<typeof changeTodolistTitleAC>
export const changeTodolistTitleAC = (id: string, title: string) => {
    return {
        type: "CHANGE-TODOLIST-TITLE",
        id,
        title,
    } as const
}


type changeFilterTodolistACType = ReturnType<typeof changeFilterTodolistAC>
export const changeFilterTodolistAC = (id: string, filter: FilterValuesType) => {
    return {
        type: "CHANGE-TODOLIST-FILTER",
        id,
        filter,
    } as const
}