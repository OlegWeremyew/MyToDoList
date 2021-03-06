import React, { FC, memo, useCallback, useEffect } from 'react';

import { Button, IconButton } from '@material-ui/core';
import { Delete } from '@material-ui/icons';
import { useDispatch } from 'react-redux';

import { fetchTasksTC, Task } from './Task';
import style from './TodolistList.module.css';
import { PropsType } from './types';

import { AddItemForm } from 'components/AddItemForm/AddItemForm';
import { EditableSpan } from 'components/EditableSpan/EditableSpan';
import { TaskStatuses } from 'enums/index';
import { LoadingStatuses } from 'features/enums';
import { FilterValuesType } from 'features/TodolistLists/types';

export const Todolist: FC<PropsType> = memo(
  ({
    changeTaskStatus,
    addTaskCallBack,
    todolist,
    removeTodolistCallBack,
    changeTodolistTitleCallBack,
    changeTaskTitle,
    removeTask,
    changeFilterCallBack,
    ...props
  }) => {
    const dispatch = useDispatch();

    useEffect(() => {
      dispatch(fetchTasksTC(todolist.id));
    }, [dispatch, todolist.id]);

    const addTask = useCallback(
      (title: string) => {
        addTaskCallBack(title, todolist.id);
      },
      [addTaskCallBack, todolist.id],
    );

    const removeTodolist = useCallback(() => {
      removeTodolistCallBack(todolist.id);
    }, [removeTodolistCallBack, todolist.id]);

    const changeTodolistTitle = useCallback(
      (title: string) => {
        changeTodolistTitleCallBack(todolist.id, title);
      },
      [changeTodolistTitleCallBack, todolist.id],
    );

    const onClickHandler = useCallback(
      (value: FilterValuesType) => {
        changeFilterCallBack(value, todolist.id);
      },
      [changeFilterCallBack, todolist.id],
    );

    let tasksForTodolist = props.tasks;

    if (todolist.filter === 'active') {
      tasksForTodolist = tasksForTodolist.filter(
        task => task.status === TaskStatuses.New,
      );
    }

    if (todolist.filter === 'completed') {
      tasksForTodolist = tasksForTodolist.filter(
        task => task.status === TaskStatuses.Completed,
      );
    }

    return (
      <div>
        <div className={style.todolist__title}>
          <EditableSpan value={todolist.title} onChange={changeTodolistTitle} />
          <IconButton
            onClick={removeTodolist}
            disabled={todolist.entityStatus === LoadingStatuses.Loading}
          >
            <Delete />
          </IconButton>
        </div>
        <AddItemForm
          label="Name task"
          addItem={addTask}
          disabled={todolist.entityStatus === LoadingStatuses.Loading}
        />
        <div>
          {tasksForTodolist.map(task => (
            <Task
              key={task.id}
              todolistId={todolist.id}
              task={task}
              removeTask={removeTask}
              changeTaskStatus={changeTaskStatus}
              changeTaskTitle={changeTaskTitle}
            />
          ))}
        </div>
        <div style={{ paddingTop: '10px' }}>
          <Button
            variant={todolist.filter === 'all' ? 'contained' : 'text'}
            onClick={() => onClickHandler('all')}
            color="success"
          >
            All
          </Button>
          <Button
            variant={todolist.filter === 'active' ? 'contained' : 'text'}
            onClick={() => onClickHandler('active')}
            color="primary"
          >
            Active
          </Button>
          <Button
            variant={todolist.filter === 'completed' ? 'contained' : 'text'}
            onClick={() => onClickHandler('completed')}
            color="secondary"
          >
            Completed
          </Button>
        </div>
      </div>
    );
  },
);
