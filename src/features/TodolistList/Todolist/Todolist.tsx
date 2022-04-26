import React, { useCallback, useEffect } from 'react';

import { Button, IconButton } from '@material-ui/core';
import { Delete } from '@material-ui/icons';
import { useDispatch } from 'react-redux';

import { TaskStatuses, TaskType } from '../../../api/todolistApi';
import { AddItemForm } from '../../../components/AddItemForm/AddItemForm';
import { EditableSpan } from '../../../components/EditableSpan/EditableSpan';
import { fetchTasksTC } from '../tasksReducer';
import { FilterValuesType, TodolistDomainType } from '../todolistsReducer';

import { Task } from './Task/Task';
import style from './TodolistList.module.css';

export const Todolist: React.FC<PropsType> = React.memo(
  ({
    demo = false,
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
      if (demo) {
        return;
      }
      dispatch(fetchTasksTC(todolist.id));
    }, [demo, dispatch, todolist.id]);

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
            disabled={todolist.entityStatus === 'loading'}
          >
            <Delete />
          </IconButton>
        </div>
        <AddItemForm
          label="Name task"
          addItem={addTask}
          disabled={todolist.entityStatus === 'loading'}
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
            variant={todolist.filter === 'all' ? 'outlined' : 'text'}
            onClick={() => onClickHandler('all')}
            color="success"
          >
            All
          </Button>
          <Button
            variant={todolist.filter === 'active' ? 'outlined' : 'text'}
            onClick={() => onClickHandler('active')}
            color="primary"
          >
            Active
          </Button>
          <Button
            variant={todolist.filter === 'completed' ? 'outlined' : 'text'}
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

// type

type PropsType = {
  todolist: TodolistDomainType;
  tasks: Array<TaskType>;
  removeTask: (taskId: string, todolistId: string) => void;
  changeFilterCallBack: (value: FilterValuesType, todolistId: string) => void;
  addTaskCallBack: (title: string, todolistId: string) => void;
  changeTaskStatus: (id: string, status: TaskStatuses, todolistId: string) => void;
  removeTodolistCallBack: (id: string) => void;
  changeTodolistTitleCallBack: (id: string, newTitle: string) => void;
  changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void;
  demo: boolean;
};
