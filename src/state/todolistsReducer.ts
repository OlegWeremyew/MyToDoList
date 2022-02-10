import {v1} from 'uuid';
import {TodolistType} from "../api/todolistApi";

type ActionsType = RemoveTodolistActionType
    | AddTodolistActionType
    | ChangeTodolistTitleActionType
    | ChangeTodolistFilterActionType

export type FilterValuesType = "all" | "active" | "completed";

export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
}


const initialState: Array<TodolistDomainType> = []

export const todolistsReducer = (state: Array<TodolistDomainType> = initialState, action: ActionsType): Array<TodolistDomainType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return state.filter(tl => tl.id != action.payload.id)
        }
        case 'ADD-TODOLIST': {
            return [{
                id: action.payload.todolistId,
                title: action.payload.title,
                filter: 'all',
                addedDate: "",
                order: 0,
            }, ...state]
        }
        case 'CHANGE-TODOLIST-TITLE': {
            const todolist = state.find(tl => tl.id === action.payload.id);
            if (todolist) {
                todolist.title = action.payload.title;
            }
            return [...state]
        }
        case 'CHANGE-TODOLIST-FILTER': {
            const todolist = state.find(tl => tl.id === action.payload.id);
            if (todolist) {
                todolist.filter = action.payload.filter;
            }
            return [...state]
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
