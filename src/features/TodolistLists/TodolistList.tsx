import React, { useCallback, useEffect } from 'react';

import { Grid, Paper } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

import { TaskType } from '../../api/types';
import { AppRootStateType } from '../../App/store';
import { AddItemForm } from '../../components/AddItemForm/AddItemForm';
import { PATH, TaskStatuses } from '../../enums';
import {
  getIsLoggedInSelector,
  getTaskSelector,
  getTodoLists,
} from '../../selectors/appSelectors';

import { addTaskTC, removeTaskTC, updateTaskTC } from './Todolist/Task/tasksReducer';
import { Todolist } from './Todolist/Todolist';
import style from './TodolistList.module.scss';
import {
  ActionTodolist,
  addTodolistTC,
  ChangeTodolistTitleTC,
  fetchTodolistsTC,
  FilterValuesType,
  removeTodolistTC,
  TodolistDomainType,
} from './todolistsReducer';

export const TodolistList: React.FC = () => {
  const dispatch = useDispatch();

  const todoLists = useSelector<AppRootStateType, Array<TodolistDomainType>>(
    getTodoLists,
  );
  const tasks = useSelector<AppRootStateType, TasksStateType>(getTaskSelector);
  const isLoggedIn = useSelector<AppRootStateType, boolean>(getIsLoggedInSelector);

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
