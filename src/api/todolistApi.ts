import axios, {AxiosResponse} from "axios";
import {Nullable} from "../types/Nullable";

const instance = axios.create({
    withCredentials: true,
    baseURL: "https://social-network.samuraijs.com/api/1.1",
    headers: {
        'API-KEY': 'f5a121b3-d5d2-4866-a73a-ab1418f0e4d8',
    },
})
export const todolistAPI = {

    // todolist =============================
    getTodos(): Promise<AxiosResponse<TodolistType[]>> {
        return instance.get<TodolistType[]>(`todo-lists/`)
    },

    createTodo(title: string) {
        return instance.post<ResponseType<{ item: TodolistType }>>(`todo-lists/`, {title})
    },

    updateTodoTitle(todolistId: string, title: string) {
        return instance.put<ResponseType>(`todo-lists/${todolistId}`, {title})
    },

    deleteTodo(todolistId: string) {
        return instance.delete<ResponseType>(`todo-lists/${todolistId}`)
    },

    // tasks =============================
    getTasks(todolistId: string) {
        return instance.get<GetTasksResponse>(`todo-lists/${todolistId}/tasks/`)
    },

    deleteTask(todolistId: string, taskId: string) {
        return instance.delete<ResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`)
    },

    createTask(todolistId: string, title: string) {
        return instance.post<{ title: string }, AxiosResponse<ResponseType<{ item: TaskType }>>>((`todo-lists/${todolistId}/tasks/`), {title})
    },

    updateTask(todolistId: string, taskId: string, model: UpdateTaskModelType) {
        return instance.put<UpdateTaskModelType, AxiosResponse<ResponseType<{ item: TaskType }>>>((`todo-lists/${todolistId}/tasks/${taskId}`), model)
    },
}

export const authAPI = {
    login(data: LoginParamsType) {
        return instance.post<LoginParamsType, AxiosResponse<ResponseType<{ userId: number }>>>("/auth/login", data)
    },
    me() {
        return instance.get<ResponseType<{ data: ResponseMeType }>>("/auth/me")
    },
    logout() {
        return instance.delete<ResponseType>("/auth/login")
    },
}


// types ====================================

type ResponseMeType = {
    id: number
    email: string
    login: string
}

export type LoginParamsType = {
    email: string
    password: string
    rememberMe?: boolean
    captcha?: string
}

export type TodolistType = {
    id: string
    title: string
    addedDate: string
    order: number
}

export type ResponseType<D = {}> = {
    resultCode: number
    messages: Array<string>
    fieldsErrors: Array<string>
    data: D
}

export enum TaskStatuses {
    New = 0,
    InProgress = 1,
    Completed = 2,
    Draft = 3
}

export enum TaskPriorities {
    Low = 0,
    Middle = 1,
    Hi = 2,
    Urgently = 3,
    Later = 4
}

export type TaskType = {
    description: string
    title: string
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}

export type UpdateTaskModelType = {
    title: string
    description: string
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
}

export type GetTasksResponse = {
    error: Nullable<string>
    totalCount: number
    items: TaskType[]
}

