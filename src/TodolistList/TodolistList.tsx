import {
    addTodolistTC,
    changeTodolistFilterAC, ChangeTodolistTitleTC,
    fetchTodolistsTC,
    FilterValuesType, removeTodolistTC,
    TodolistDomainType
} from "./todolistsReducer";
import React, {useCallback, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../App/store";
import {addTaskTC, removeTaskTC, updateTaskTC} from "./tasksReducer";
import {TaskStatuses, TaskType} from "../api/todolistApi";
import {Grid, Paper} from "@material-ui/core";
import {AddItemForm} from "../components/AddItemForm/AddItemForm";
import {Todolist} from "./Todolist/Todolist";

export type TasksStateType = {
    [key: string]: Array<TaskType>
}

type PropsType = {
    demo?: boolean
}

export const TodolistList: React.FC<PropsType> = ({demo = false}) => {

    useEffect(() => {
        if (demo) {
            return
        }
        dispatch(fetchTodolistsTC())
    }, [])

    const todoLists = useSelector<AppRootStateType, Array<TodolistDomainType>>(state => state.todolists)
    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)
    const dispatch = useDispatch();

    const removeTask = useCallback((id: string, todolistId: string) => {
        dispatch(removeTaskTC(id, todolistId));
    }, [dispatch])

    const addTask = useCallback((title: string, todolistId: string) => {
        dispatch(addTaskTC(todolistId, title));
    }, [dispatch])

    const changeStatus = useCallback((id: string, status: TaskStatuses, todolistId: string) => {
        dispatch(updateTaskTC(id, todolistId, {status}))
    }, [dispatch])

    const changeTaskTitle = useCallback((id: string, newTitle: string, todolistId: string) => {
        dispatch(updateTaskTC(id, todolistId, {title: newTitle}));
    }, [dispatch])

    const changeFilter = useCallback((value: FilterValuesType, todolistId: string) => {
        dispatch(changeTodolistFilterAC(todolistId, value));
    }, [dispatch])

    const removeTodolist = useCallback((id: string) => {
        dispatch(removeTodolistTC(id));
    }, [dispatch])

    const changeTodolistTitle = useCallback((id: string, title: string) => {
        dispatch(ChangeTodolistTitleTC(id, title));
    }, [dispatch])

    const addTodolist = useCallback((title: string) => {
        dispatch(addTodolistTC(title));
    }, [dispatch])

    return (
        <>
            <Grid container style={{padding: "20px"}}>
                <AddItemForm label={'Name todolist'} addItem={addTodolist}/>
            </Grid>
            <Grid container spacing={3}>
                {
                    todoLists.map(tl => {
                        return <Grid item key={tl.id}>
                            <Paper style={{padding: "10px"}}>
                                <Todolist
                                    todolist={tl}
                                    tasks={tasks[tl.id]}
                                    removeTask={removeTask}
                                    changeFilter={changeFilter}
                                    addTask={addTask}
                                    changeTaskStatus={changeStatus}
                                    removeTodolist={removeTodolist}
                                    changeTaskTitle={changeTaskTitle}
                                    changeTodolistTitle={changeTodolistTitle}
                                    demo={demo}
                                />
                            </Paper>
                        </Grid>
                    })
                }
            </Grid>
        </>)
}

