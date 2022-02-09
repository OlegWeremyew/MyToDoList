import axios from "axios";

const instance = axios.create({
    withCredentials: true,
    baseURL: "https://social-network.samuraijs.com/api/1.1//todo-lists/",
    headers: {
        'API-KEY': 'f5a121b3-d5d2-4866-a73a-ab1418f0e4d8',
    },
})

export const todolistAPI = {
    updateTodolist(todolistId: string, title: string) {
       return instance.put(`${todolistId}`, {title})
    }
}
