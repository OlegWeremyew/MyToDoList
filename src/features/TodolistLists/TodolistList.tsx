import React, { useCallback, useEffect } from 'react';

import { Grid, Paper } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

import { TaskType } from '../../api/types';
import { PATH, TaskStatuses } from '../../enums';
import { ReturnComponentType } from '../../types/ReturnComponentType';

import { addTaskTC, removeTaskTC, Todolist, updateTaskTC } from './Todolist';
import { ActionTodolist } from './TodolistAction';
import style from './TodolistList.module.scss';
import {
  addTodolistTC,
  ChangeTodolistTitleTC,
  fetchTodolistsTC,
  removeTodolistTC,
} from './TodolistThunk';
import { FilterValuesType, TodolistDomainType } from './types';

import { AddItemForm } from 'components/AddItemForm/AddItemForm';
import { getIsLoggedInSelector } from 'selectors/authSelectors/authSelectors';
import { getTaskSelector } from 'selectors/taskSelectors/taskSelectors';
import { getTodoLists } from 'selectors/todolistSelectors/todolistSelectors';

export const TodolistList = (): ReturnComponentType => {
  const dispatch = useDispatch();

  const todoLists: TodolistDomainType[] = useSelector(getTodoLists);
  const tasks: TasksStateType = useSelector(getTaskSelector);
  const isLoggedIn: boolean = useSelector(getIsLoggedInSelector);

  useEffect(() => {
    if (!isLoggedIn) {
      return;
    }
    dispatch(fetchTodolistsTC());
  }, [isLoggedIn, dispatch]);

  const removeTask = useCallback(
    (id: string, todolistId: string) => {
      dispatch(removeTaskTC(id, todolistId));
    },
    [dispatch],
  );

  const addTask = useCallback(
    (title: string, todolistId: string) => {
      dispatch(addTaskTC(todolistId, title));
    },
    [dispatch],
  );

  const changeStatus = useCallback(
    (id: string, status: TaskStatuses, todolistId: string) => {
      dispatch(updateTaskTC(id, todolistId, { status }));
    },
    [dispatch],
  );

  const changeTaskTitle = useCallback(
    (id: string, newTitle: string, todolistId: string) => {
      dispatch(updateTaskTC(id, todolistId, { title: newTitle }));
    },
    [dispatch],
  );

  const changeFilter = useCallback(
    (value: FilterValuesType, todolistId: string) => {
      dispatch(ActionTodolist.changeTodolistFilterAC(todolistId, value));
    },
    [dispatch],
  );

  const removeTodolist = useCallback(
    (id: string) => {
      dispatch(removeTodolistTC(id));
    },
    [dispatch],
  );

  const changeTodolistTitle = useCallback(
    (id: string, title: string) => {
      dispatch(ChangeTodolistTitleTC(id, title));
    },
    [dispatch],
  );

  const addTodolist = useCallback(
    (title: string) => {
      dispatch(addTodolistTC(title));
    },
    [dispatch],
  );

  if (!isLoggedIn) {
    return <Navigate to={PATH.LOGIN} />;
  }

  return (
    <>
      <Grid container className={style.gridForm}>
        <AddItemForm label="Name todolist" addItem={addTodolist} />
      </Grid>
      <Grid container spacing={3} className={style.gridTodolist}>
        {todoLists.map(todo => (
          <Grid item key={todo.id}>
            <Paper className={style.paperStyle}>
              <Todolist
                todolist={todo}
                tasks={tasks[todo.id]}
                removeTask={removeTask}
                changeFilterCallBack={changeFilter}
                addTaskCallBack={addTask}
                changeTaskStatus={changeStatus}
                removeTodolistCallBack={removeTodolist}
                changeTaskTitle={changeTaskTitle}
                changeTodolistTitleCallBack={changeTodolistTitle}
              />
            </Paper>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

// Types

export type TasksStateType = {
  [key: string]: Array<TaskType>;
};
