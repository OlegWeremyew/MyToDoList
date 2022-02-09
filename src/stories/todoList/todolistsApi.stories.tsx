import React, {useEffect, useState} from 'react'
import axios from "axios";
import {todolistAPI} from "../../api/todolistApi";

export default {
    title: 'API',
}

const settings = {
    withCredentials: true,
    headers: {
        'API-KEY': 'f5a121b3-d5d2-4866-a73a-ab1418f0e4d8',
    },
}


export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        axios.get('https://social-network.samuraijs.com/api/1.1/todo-lists', settings)
            .then((res) => {
                setState(res.data);
            })

    }, [])

    return <div> {JSON.stringify(state)}</div>
}

export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        axios.post('https://social-network.samuraijs.com/api/1.1/todo-lists', {title: "newTodolist"}, settings)
            .then((res) => {
                setState(res.data);
            })

    }, [])

    return <div> {JSON.stringify(state)}</div>
}

export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = 'a5ced398-c2cc-4ed4-af5d-d80aa3c85dab';
        axios.delete(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}`, settings)
            .then((res) => {
                setState(res.data);
            })

    }, [])

    return <div> {JSON.stringify(state)}</div>
}

export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = '9c5d4763-6fe6-4c99-b970-f75ad989b051'
        todolistAPI.updateTodolist(todolistId, '11111111111111111111111111111')
            .then((res) => {
                setState(res.data)
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
