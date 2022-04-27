import React, { ChangeEvent, useCallback } from 'react';

import { Checkbox, IconButton } from '@material-ui/core';
import { Delete } from '@material-ui/icons';

import { TaskType } from '../../../../api/types';
import { TaskStatuses } from '../../../../enums';

import style from './Task.module.css';

import { EditableSpan } from 'components/EditableSpan/EditableSpan';

export const Task: React.FC<TaskPropsType> = React.memo(
  ({ task, removeTask, todolistId, changeTaskStatus, changeTaskTitle }) => {
    const onClickHandler = useCallback(() => {
      removeTask(task.id, todolistId);
    }, [task.id, todolistId, removeTask]);

    const onChangeHandler = useCallback(
      (e: ChangeEvent<HTMLInputElement>) => {
        const newIsDoneValue = e.currentTarget.checked;
        changeTaskStatus(
          task.id,
          newIsDoneValue ? TaskStatuses.Completed : TaskStatuses.New,
          todolistId,
        );
      },
      [task.id, todolistId, changeTaskStatus],
    );

    const onTitleChangeHandler = useCallback(
      (newValue: string) => {
        changeTaskTitle(task.id, newValue, todolistId);
      },
      [task.id, todolistId, changeTaskTitle],
    );

    return (
      <div
        key={task.id}
        className={task.status === TaskStatuses.Completed ? 'is-done' : ''}
      >
        <div className={style.containerTask}>
          <div className={style.mainBlock}>
            <Checkbox
              checked={task.status === TaskStatuses.Completed}
              color="primary"
              onChange={onChangeHandler}
            />
            <EditableSpan value={task.title} onChange={onTitleChangeHandler} />
          </div>
          <IconButton onClick={onClickHandler} size="small">
            <Delete fontSize="inherit" />
          </IconButton>
        </div>
      </div>
    );
  },
);

// type
export type TaskPropsType = {
  todolistId: string;
  task: TaskType;
  removeTask: (taskID: string, todolistID: string) => void;
  changeTaskStatus: (taskID: string, status: TaskStatuses, todolistId: string) => void;
  changeTaskTitle: (taskID: string, newValue: string, todolistID: string) => void;
};
