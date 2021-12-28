import {TodolistType} from "../App";
import {v1} from "uuid";

export const todolistsReducer = (state: Array<TodolistType>, action: ActionType): Array<TodolistType> => {
    switch (action.type) {
        case "REMOVE-TODOLIST" : {
            return state.filter(f => f.id !== action.id)
        }
        case "ADD-TODOLIST" : {
            let newTodolistId = v1()
            return [{id: newTodolistId, title: action.title, filter: 'all'},...state]
        }
        default:
            return state
    }
}

type ActionType = removeTodolistACType | addTodolistACType

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