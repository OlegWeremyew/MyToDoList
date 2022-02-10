import React, {useEffect, useState} from 'react'
import {todolistAPI} from "../../api/todolistApi";

export default {
    title: 'API/Todolist',
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
        const todolistId = '65d8576c-d62b-4db0-a8de-e928ff0fac22';
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
        const todolistId = '8cb36594-ed01-424d-9298-893227e9a9dc'
        todolistAPI.updateTodoTitle(todolistId, 'OLEGOLEGOLEG')
            .then((res) => {
                setState(res.data)
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
