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
        todolistAPI.getTodos()
            .then((res) => {
                setState(res.data);
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}

export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistAPI.createTodo("OlegNEWTODO111111111111111111111111111111")
            .then((res) => {
                setState(res.data);
            })

    }, [])

    return <div> {JSON.stringify(state)}</div>
}

export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = 'fe737155-16e3-46a5-927f-07279279ae8b';
        todolistAPI.deleteTodo(todolistId)
            .then((res) => {
                setState(res.data);
            })

    }, [])

    return <div> {JSON.stringify(state)}</div>
}

export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = '22411bd6-c367-4068-abdc-fed196cbc621'
        todolistAPI.updateTodosTitle(todolistId, 'OLEGOLEGOLEG')
            .then((res) => {
                setState(res.data)
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
