import {todolistAPI, TodolistType} from "../../api/todolistApi";
import {Dispatch} from "redux";
import {RequestStatusType, setAppStatusAC} from "../../App/AppReducer";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export type FilterValuesType = "all" | "active" | "completed";

export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
    entityStatus: RequestStatusType
}

const initialState: Array<TodolistDomainType> = []

const slice = createSlice({
    name: "Todolist",
    initialState,
    reducers: {
        removeTodolistAC(state, action: PayloadAction<{ todolistId: string }>) {
            const index = state.findIndex(fi => fi.id !== action.payload.todolistId)
            if (index > -1) {
                state.splice(index, 1)
            }
        },
        addTodolistAC(state, action: PayloadAction<{ todolist: TodolistType }>) {
            state.unshift({...action.payload.todolist, filter: "all", entityStatus: "idle"})
        },
        changeTodolistTitleAC(state, action: PayloadAction<{ id: string, title: string }>) {
            const index = state.findIndex(fi => fi.id === action.payload.id)
            state[index].title = action.payload.title
        },
        changeTodolistFilterAC(state, action: PayloadAction<{ id: string, filter: FilterValuesType }>) {
            const index = state.findIndex(fi => fi.id === action.payload.id)
            state[index].filter = action.payload.filter
        },
        changeTodolistEntityStatusAC(state, action: PayloadAction<{ id: string, status: RequestStatusType }>) {
            const index = state.findIndex(fi => fi.id !== action.payload.id)
            state[index].entityStatus = action.payload.status
        },
        setTodosAC(state, action: PayloadAction<{ todos: Array<TodolistType> }>) {
            return action.payload.todos.map(m => ({...m, filter: 'all', entityStatus: 'idle'}))
        },
    },
})

export const {
    removeTodolistAC,
    addTodolistAC,
    changeTodolistTitleAC,
    changeTodolistFilterAC,
    setTodosAC,
    changeTodolistEntityStatusAC
} = slice.actions

export const todolistsReducer = slice.reducer

// Thunk=============================================================
export const fetchTodolistsTC = () => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({status: "loading"}))
    todolistAPI.getTodos()
        .then(res => {
            dispatch(setTodosAC({todos: res.data}))
            dispatch(setAppStatusAC({status: "succeeded"}))
        })
}

export const removeTodolistTC = (todolistId: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({status: "loading"}))
    dispatch(changeTodolistEntityStatusAC({id: todolistId, status: "loading"}))
    todolistAPI.deleteTodo(todolistId)
        .then(() => {
            dispatch(removeTodolistAC({todolistId: todolistId}))
            dispatch(setAppStatusAC({status: "succeeded"}))
        })
}

export const addTodolistTC = (title: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({status: "loading"}))
    todolistAPI.createTodo(title)
        .then(res => {
            dispatch(addTodolistAC({todolist: res.data.data.item}))
            dispatch(setAppStatusAC({status: "succeeded"}))
        })
}

export const ChangeTodolistTitleTC = (id: string, title: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({status: "loading"}))
    todolistAPI.updateTodoTitle(id, title)
        .then(() => {
            dispatch(changeTodolistTitleAC({id: id, title}))
            dispatch(setAppStatusAC({status: "succeeded"}))
        })
}