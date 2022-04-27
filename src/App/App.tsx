import React, { useEffect } from 'react';

import { CircularProgress, Container } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, Route, Routes } from 'react-router-dom';

import { ButtonAppBar } from '../components/ButtonAppBar/ButtonAppBar';
import { ErrorSnackbar } from '../components/ErrorSnackbar/ErrorSnackbar';
import { PageNotFound } from '../components/PageNotFound/PageNotFound';
import { Login } from '../features/Login/Login';
import { TodolistList } from '../features/TodolistLists/TodolistList';
import { ReturnComponentType } from '../types/ReturnComponentType';
import { getIsInitializedSelector } from '../utils/appSelectors';
import { PATH } from '../utils/RouterPATH';

import style from './App.module.scss';
import { initializeAppTC } from './AppReducer';
import { AppRootStateType } from './store';

export const App: React.FC<PropsType> = ({ demo = false }): ReturnComponentType => {
  const dispatch = useDispatch();

  const isInitialized = useSelector<AppRootStateType, boolean>(getIsInitializedSelector);

  useEffect(() => {
    dispatch(initializeAppTC());
  }, [dispatch, isInitialized]);

  if (!isInitialized) {
    return (
      <div className={style.preloader}>
        <CircularProgress />
      </div>
    );
  }

  return (
    <div>
      <ErrorSnackbar />
      <ButtonAppBar />
      <Container fixed>
        <Routes>
          <Route path={PATH.MAIN_WINDOW} element={<TodolistList demo={demo} />} />
          <Route path={PATH.LOGIN} element={<Login />} />
          <Route path={PATH.PAGE_NOT_FOUND} element={<PageNotFound />} />
          <Route path={PATH.ERROR} element={<Navigate to={PATH.PAGE_NOT_FOUND} />} />
        </Routes>
      </Container>
    </div>
  );
};

// type

type PropsType = {
  // eslint-disable-next-line react/require-default-props
  demo?: boolean;
};
