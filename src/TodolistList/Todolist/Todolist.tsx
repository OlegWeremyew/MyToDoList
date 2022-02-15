import React, {useCallback, useEffect} from 'react';
import {AddItemForm} from '../../components/AddItemForm/AddItemForm';
import {EditableSpan} from '../../components/EditableSpan/EditableSpan';
import {Button, IconButton} from '@material-ui/core';
import {Delete} from '@material-ui/icons';
import {Task} from "./Task/Task";
import {TaskStatuses, TaskType} from "../../api/todolistApi";
import {FilterValuesType, TodolistDomainType} from "../todolistsReducer";
import {useDispatch} from "react-redux";
import {fetchTasksTC} from "../tasksReducer";

type PropsType = {
    todolist: TodolistDomainType
    tasks: Array<TaskType>
    removeTask: (taskId: string, todolistId: string) => void
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeTaskStatus: (id: string, status: TaskStatuses, todolistId: string) => void
    removeTodolist: (id: string) => void
    changeTodolistTitle: (id: string, newTitle: string) => void
    changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void
    demo?: boolean
}

export const Todolist = React.memo(({demo = false, ...props}: PropsType) => {

    const dispatch = useDispatch()
    useEffect(() => {
        if (demo) {
            return
        }
        dispatch(fetchTasksTC(props.todolist.id))
    }, [])

    const addTask = useCallback((title: string) => {
        props.addTask(title, props.todolist.id);
    }, [props.addTask, props.todolist.id])

    const removeTodolist = useCallback(() => {
        props.removeTodolist(props.todolist.id);
    }, [props.removeTodolist, props.todolist.id])

    const changeTodolistTitle = useCallback((title: string) => {
        props.changeTodolistTitle(props.todolist.id, title);
    }, [props.changeTodolistTitle, props.todolist.id])

    const onClickHandler = useCallback((value: FilterValuesType) => {
        props.changeFilter(value, props.todolist.id)
    }, [props.changeFilter, props.todolist.id]);

    let tasksForTodolist = props.tasks;

    if (props.todolist.filter === "active") {
        tasksForTodolist = tasksForTodolist.filter(t => t.status === TaskStatuses.New);
    }
    if (props.todolist.filter === "completed") {
        tasksForTodolist = tasksForTodolist.filter(t => t.status === TaskStatuses.Completed);
    }

    return <div>
        <h3>
            <EditableSpan value={props.todolist.title} onChange={changeTodolistTitle}/>
            <IconButton onClick={removeTodolist} disabled={props.todolist.entityStatus === "loading"}>
                <Delete/>
            </IconButton>
        </h3>
        <AddItemForm
            label={'Name task'}
            addItem={addTask}
            disabled={props.todolist.entityStatus === "loading"}/>
        <div>
            {
                tasksForTodolist.map(t => {
                    return (
                        <Task
                            key={t.id}
                            todolistId={props.todolist.id}
                            task={t}
                            removeTask={props.removeTask}
                            changeTaskStatus={props.changeTaskStatus}
                            changeTaskTitle={props.changeTaskTitle}
                        />
                    )
                })
            }
        </div>
        <div style={{paddingTop: "10px"}}>
            <Button variant={props.todolist.filter === 'all' ? 'outlined' : 'text'}
                    onClick={() => onClickHandler('all')}
                    color={'success'}>
                All
            </Button>
            <Button variant={props.todolist.filter === 'active' ? 'outlined' : 'text'}
                    onClick={() => onClickHandler('active')}
                    color={'primary'}>
                Active
            </Button>
            <Button variant={props.todolist.filter === 'completed' ? 'outlined' : 'text'}
                    onClick={() => onClickHandler('completed')}
                    color={'secondary'}>
                Completed
            </Button>
        </div>
    </div>
})


