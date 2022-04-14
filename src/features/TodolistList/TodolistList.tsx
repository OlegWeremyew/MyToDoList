import {
    addTodolistTC,
    changeTodolistFilterAC, ChangeTodolistTitleTC,
    fetchTodolistsTC,
    FilterValuesType, removeTodolistTC,
    TodolistDomainType
} from "./todolistsReducer";
import React, {useCallback, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Navigate} from "react-router-dom";

import {AppRootStateType} from "../../App/store";
import {addTaskTC, removeTaskTC, updateTaskTC} from "./tasksReducer";
import {TaskStatuses, TaskType} from "../../api/todolistApi";
import {AddItemForm} from "../../components/AddItemForm/AddItemForm";
import {Todolist} from "./Todolist/Todolist";
import {PATH} from "../../utils/RouterPATH";
import {Grid, Paper} from "@material-ui/core";
import {getIsLoggedInSelector, getTaskSelector, getTodoLists} from "../../utils/appSelectors";

export const TodolistList: React.FC<PropsType> = ({demo = false}) => {

    const dispatch = useDispatch()

    const todoLists = useSelector<AppRootStateType, Array<TodolistDomainType>>(getTodoLists)
    const tasks = useSelector<AppRootStateType, TasksStateType>(getTaskSelector)
    const isLoggedIn = useSelector<AppRootStateType, boolean>(getIsLoggedInSelector)

    useEffect(() => {
        if (demo || !isLoggedIn) {
            return
        }
        dispatch(fetchTodolistsTC())
    }, [demo, isLoggedIn, dispatch])

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

    if (!isLoggedIn) {
        return <Navigate to={PATH.LOGIN}/>
    }

    return (
        <>
            <Grid container style={{padding: "20px"}} justifyContent={'center'}>
                <AddItemForm label={'Name todolist'} addItem={addTodolist}/>
            </Grid>
            <Grid container spacing={3} justifyContent={'center'}>
                {
                    todoLists.map(tl => {
                        return (
                            <Grid item key={tl.id}>
                                <Paper style={{padding: "10px"}}>
                                    <Todolist
                                        todolist={tl}
                                        tasks={tasks[tl.id]}
                                        removeTask={removeTask}
                                        changeFilterCallBack={changeFilter}
                                        addTaskCallBack={addTask}
                                        changeTaskStatus={changeStatus}
                                        removeTodolistCallBack={removeTodolist}
                                        changeTaskTitle={changeTaskTitle}
                                        changeTodolistTitleCallBack={changeTodolistTitle}
                                        demo={demo}
                                    />
                                </Paper>
                            </Grid>
                        )
                    })
                }
            </Grid>
        </>)
}

//Types

export type TasksStateType = {
    [key: string]: Array<TaskType>
}

type PropsType = {
    demo?: boolean
}


