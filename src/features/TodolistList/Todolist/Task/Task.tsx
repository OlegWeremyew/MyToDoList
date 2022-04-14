import React, {ChangeEvent, useCallback} from 'react';
import classes from './Task.module.css'

import {Checkbox, IconButton} from "@material-ui/core";
import {EditableSpan} from "../../../../components/EditableSpan/EditableSpan";
import {Delete} from "@material-ui/icons";
import {TaskStatuses, TaskType} from "../../../../api/todolistApi";

export const Task: React.FC<TaskPropsType> = React.memo(({
                                                             task,
                                                             removeTask,
                                                             todolistId,
                                                             changeTaskStatus,
                                                             changeTaskTitle
                                                         }) => {

    const onClickHandler = useCallback(() => {
        removeTask(task.id, todolistId)
    }, [task.id, todolistId, removeTask])

    const onChangeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = e.currentTarget.checked;
        changeTaskStatus(task.id, newIsDoneValue ? TaskStatuses.Completed : TaskStatuses.New, todolistId);
    }, [task.id, todolistId, changeTaskStatus])

    const onTitleChangeHandler = useCallback((newValue: string) => {
        changeTaskTitle(task.id, newValue, todolistId);
    }, [task.id, todolistId, changeTaskTitle])

    return (
        <div key={task.id} className={task.status === TaskStatuses.Completed ? "is-done" : ""}>
            <div className={classes.containerTask}>
                <div className={classes.mainBlock}>
                    <Checkbox
                        checked={task.status === TaskStatuses.Completed}
                        color="primary"
                        onChange={onChangeHandler}
                    />
                    <EditableSpan value={task.title} onChange={onTitleChangeHandler}/>
                </div>
                <IconButton onClick={onClickHandler} size="small">
                    <Delete fontSize="inherit"/>
                </IconButton>
            </div>
        </div>
    )
})

//type
export type TaskPropsType = {
    todolistId: string
    task: TaskType
    removeTask: (taskID: string, todolistID: string) => void
    changeTaskStatus: (taskID: string, status: TaskStatuses, todolistId: string) => void
    changeTaskTitle: (taskID: string, newValue: string, todolistID: string) => void
}