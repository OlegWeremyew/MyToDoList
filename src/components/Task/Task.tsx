import React, {ChangeEvent, useCallback} from 'react';
import {Checkbox, IconButton} from "@material-ui/core";
import {EditableSpan} from "../EditableSpan/EditableSpan";
import {Delete} from "@material-ui/icons";
import {TaskStatuses, TaskType} from "../../api/todolistApi";

export type TaskPropsType = {
    todolistId: string
    task: TaskType
    removeTask: (taskID: string, todolistID: string) => void
    changeTaskStatus: (taskID: string, status: TaskStatuses, todolistId: string) => void
    changeTaskTitle: (taskID: string, newValue: string, todolistID: string) => void
}

export const Task = React.memo(({
                                    task,
                                    removeTask,
                                    todolistId,
                                    changeTaskStatus,
                                    changeTaskTitle
                                }: TaskPropsType) => {

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
            <Checkbox
                checked={task.status === TaskStatuses.Completed}
                color="primary"
                onChange={onChangeHandler}
            />

            <EditableSpan value={task.title} onChange={onTitleChangeHandler}/>
            <IconButton onClick={onClickHandler}>
                <Delete/>
            </IconButton>
        </div>
    )
})
