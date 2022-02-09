import axios, {Axios, AxiosResponse} from "axios";

const instance = axios.create({
    withCredentials: true,
    baseURL: "https://social-network.samuraijs.com/api/1.1",
    headers: {
        'API-KEY': 'f5a121b3-d5d2-4866-a73a-ab1418f0e4d8',
    },
})

export const todolistAPI = {
    // как пример типизации
    getTodos(): Promise<AxiosResponse<TodoType[]>> {
        return instance.get<TodoType[]>(`todo-lists/`)
    },

    createTodo(title: string) {
        return instance.post<BaseResponseType<{ item: TodoType }>>(`todo-lists/`, {title})
    },

    updateTodoTitle(todolistId: string, title: string) {
        return instance.put<BaseResponseType>(`todo-lists/${todolistId}`, {title})
    },

    deleteTodo(todolistId: string) {
        return instance.delete<BaseResponseType>(`todo-lists/${todolistId}`)
    },
}

export type TodoType = {
    addedDate: string
    id: string
    order: number
    title: string
}

export type BaseResponseType<D = {}> = {
    data: D
    fieldsErrors: string[]
    messages: string[]
    resultCode: number
}

