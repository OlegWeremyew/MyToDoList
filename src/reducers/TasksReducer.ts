import {TasksStateType} from "../App"
import {v1} from "uuid";

export const TasksReducer = (state: TasksStateType, action: ActionType) => {
    switch (action.type) {
        case "ADD-TASK": {
            const newTask = {id: v1(), title: action.payload.title, isDone: false};
            return {...state, [action.payload.todolistId]: [newTask, ...state[action.payload.todolistId]]}
        }
        case "REMOVE-TASK": {
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId]
                    .filter(t => t.id !== action.payload.taskId)
            }
        }
        case "CHANGE-STATUS-TASK": {
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId]
                    .filter(t => t.id !== action.payload.taskId)
            }
        }
        case "RENAME-TASK": {
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId]
                    .map(t => t.id === action.payload.taskId
                        ? {...t, title: action.payload.title}
                        : t)
            }
        }
        case "REMOVE-TASKS": {
            const newState = {...state}
            delete newState[action.payload.todolistId]
            return newState
        }
        case "ADD-TODOLIST-TASKS": {
            return {...state, [action.payload.todolistId]: []}
        }
        default:
            return state
    }
}

type ActionType = addTaskACType
    | removeTaskACType
    | changeStatusACType
    | renameTaskACType
    | removeTasksACType
    | addTodolistTasksACType

type addTaskACType = ReturnType<typeof addTaskAC>
type removeTaskACType = ReturnType<typeof removeTaskAC>
type changeStatusACType = ReturnType<typeof changeStatusAC>
type renameTaskACType = ReturnType<typeof renameTaskAC>
type removeTasksACType = ReturnType<typeof removeTasksAC>
type addTodolistTasksACType = ReturnType<typeof addTodolistTasksAC>

export const addTaskAC = (todolistId: string, title: string) => {
    return {
        type: "ADD-TASK",
        payload: {
            todolistId: todolistId,
            title: title
        }
    } as const
}

export const removeTaskAC = (todolistId: string, taskId: string) => {
    return {
        type: "REMOVE-TASK",
        payload: {
            todolistId: todolistId,
            taskId: taskId
        }
    } as const
}
export const changeStatusAC = (todolistId: string, taskId: string, isDone: boolean) => {
    return {
        type: "CHANGE-STATUS-TASK",
        payload: {
            todolistId: todolistId,
            taskId: taskId,
            isDone: isDone
        }
    } as const
}
export const renameTaskAC = (todolistId: string, taskId: string, title: string) => {
    return {
        type: "RENAME-TASK",
        payload: {
            todolistId: todolistId,
            taskId: taskId,
            title: title
        }
    } as const
}
export const removeTasksAC = (todolistId: string) => {
    return {
        type: "REMOVE-TASKS",
        payload: {
            todolistId: todolistId
        }
    } as const
}
export const addTodolistTasksAC = (todolistId: string) => {
    return {
        type: "ADD-TODOLIST-TASKS",
        payload: {
            todolistId: todolistId
        }
    } as const
}
