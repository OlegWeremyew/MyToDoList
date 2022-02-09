import axios from "axios";
import {GetTodolists} from "../stories/todoList/todolistsApi.stories";

const instance = axios.create({
    withCredentials: true,
    baseURL: "https://social-network.samuraijs.com/api/1.1",
    headers: {
        'API-KEY': 'f5a121b3-d5d2-4866-a73a-ab1418f0e4d8',
    },
})

export const todolistAPI = {
    getTodos() {
        return instance.get(`todo-lists/`)
    },

    createTodo(title: string) {
        return instance.post(`todo-lists/`, {title})
    },

    updateTodosTitle(todolistId: string, title: string) {
       return instance.put(`todo-lists/${todolistId}`, {title})
    },

    deleteTodo(todolistId: string) {
        return instance.delete(`todo-lists/${todolistId}`)
    },
}
