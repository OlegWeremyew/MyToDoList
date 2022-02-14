import React, {useCallback, useEffect} from 'react';
import {AddItemForm} from './components/AddItemForm/AddItemForm';
import {EditableSpan} from './components/EditableSpan/EditableSpan';
import {Button, IconButton} from '@material-ui/core';
import {Delete} from '@material-ui/icons';
import {Task} from "./components/Task/Task";
import {TaskStatuses, TaskType} from "./api/todolistApi";
import {FilterValuesType} from "./state/todolistsReducer";
import {useDispatch} from "react-redux";
import {fetchTasksTC} from "./state/tasksReducer";

type PropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string, todolistId: string) => void
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeTaskStatus: (id: string, status: TaskStatuses, todolistId: string) => void
    removeTodolist: (id: string) => void
    changeTodolistTitle: (id: string, newTitle: string) => void
    filter: FilterValuesType
    changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void
}

export const Todolist = React.memo((props: PropsType) => {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchTasksTC(props.id))
    }, [])

    const addTask = useCallback((title: string) => {
        props.addTask(title, props.id);
    }, [props.addTask, props.id])

    const removeTodolist = useCallback(() => {
        props.removeTodolist(props.id);
    }, [props.removeTodolist, props.id])

    const changeTodolistTitle = useCallback((title: string) => {
        props.changeTodolistTitle(props.id, title);
    }, [props.changeTodolistTitle, props.id])

    const onClickHandler = useCallback((value: FilterValuesType) => {
        props.changeFilter(value, props.id)
    }, [props.changeFilter, props.id]);

    let tasksForTodolist = props.tasks;

    if (props.filter === "active") {
        tasksForTodolist = tasksForTodolist.filter(t => t.status === TaskStatuses.New);
    }
    if (props.filter === "completed") {
        tasksForTodolist = tasksForTodolist.filter(t => t.status === TaskStatuses.Completed);
    }

    return <div>
        <h3>
            <EditableSpan value={props.title} onChange={changeTodolistTitle}/>
            <IconButton onClick={removeTodolist}>
                <Delete/>
            </IconButton>
        </h3>
        <AddItemForm label={'Name task'} addItem={addTask}/>
        <div>
            {
                tasksForTodolist.map(t => {
                    return (
                        <Task
                            key={t.id}
                            todolistId={props.id}
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
            <Button variant={props.filter === 'all' ? 'outlined' : 'text'}
                    onClick={() => onClickHandler('all')}
                    color={'success'}>
                All
            </Button>
            <Button variant={props.filter === 'active' ? 'outlined' : 'text'}
                    onClick={() => onClickHandler('active')}
                    color={'primary'}>
                Active
            </Button>
            <Button variant={props.filter === 'completed' ? 'outlined' : 'text'}
                    onClick={() => onClickHandler('completed')}
                    color={'secondary'}>
                Completed
            </Button>
        </div>
    </div>
})


