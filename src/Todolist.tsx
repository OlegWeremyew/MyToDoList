import React, {ChangeEvent} from 'react';
import {FilterValuesType} from './App';
import {AddItemForm} from "./components/AddItemForm";
import {EditableSpan} from "./components/EditableSpan";
import {Button, Checkbox, Grid, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    todolistId: string
    title: string
    tasks: Array<TaskType>
    removeTask: (todolistId: string, taskId: string) => void
    changeFilter: (todolistId: string, value: FilterValuesType) => void
    addTask: (todolistId: string, title: string) => void
    changeTaskStatus: (todolistId: string, taskId: string, isDone: boolean) => void
    filter: FilterValuesType
    removeTodolist: (todolistId: string) => void
    renameTask: (todolistId: string, idTask: string, title: string) => void
    renameTodoList: (todolistId: string, title: string) => void
}

export function Todolist({title, tasks, removeTask, changeFilter, addTask, changeTaskStatus, filter,
                             todolistId, removeTodolist, renameTask, renameTodoList,...props}: PropsType) {

    const addTaskHandler = (title: string) => {
        addTask(todolistId, title);
    }
    const allClickHandler = () => changeFilter(todolistId, "all");
    const activeClickHandler = () => changeFilter(todolistId, "active");
    const completedClickHandler = () => changeFilter(todolistId, "completed");
    const deleteTodoList = () => removeTodolist(todolistId)
    const renameTodoListHandler = (title: string) => {
        renameTodoList(todolistId, title)
    }

    return <div>
        <h3 style={{display:'flex', justifyContent:'space-between'}}>
            <EditableSpan title={title} rename={renameTodoListHandler}/>
            <IconButton onClick={deleteTodoList} aria-label="delete">
                <Delete/>
            </IconButton>
        </h3>
        <AddItemForm label={'Name task'} addTask={addTaskHandler}/>
        <div>
            {
                tasks.map(t => {
                    const onClickHandler = () => removeTask(todolistId, t.id)
                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        changeTaskStatus(todolistId, t.id, e.currentTarget.checked);
                    }
                    const renameTaskHandler = (title: string) => {
                        renameTask(todolistId, t.id, title)
                    }

                    return <div style={{height: '60px'}} key={t.id} className={t.isDone ? "is-done" : ""}>
                        <Grid container alignItems="center" justifyContent="space-between" spacing={1}>
                            <Grid item><Checkbox

                                inputProps={{'aria-label': 'controlled'}}
                                size={"small"}
                                onChange={onChangeHandler}
                                checked={t.isDone}/>
                            </Grid>
                            <Grid item>
                                <EditableSpan rename={renameTaskHandler} title={t.title}/>
                            </Grid>
                            <Grid item>
                                <IconButton onClick={onClickHandler} aria-label="delete">
                                    <Delete/>
                                </IconButton>
                            </Grid>
                        </Grid>
                    </div>
                })
            }
        </div>

        <div style={{display:'flex', justifyContent:'center'}}>
            <Button style={{margin: '5px'}} onClick={allClickHandler}
                    variant={filter === 'all' ? "contained" : 'outlined'}
                    size={"small"}
            >All
            </Button>
            <Button style={{margin: '5px'}} onClick={activeClickHandler}
                    variant={filter === 'active' ? "contained" : 'outlined'}
                    size={"small"}
            >Active
            </Button>
            <Button style={{margin: '5px'}} onClick={completedClickHandler}
                    variant={filter === 'completed' ? "contained" : 'outlined'}
                    size={"small"}
            >Completed
            </Button>
        </div>
    </div>
}



