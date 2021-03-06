import React, { FC, useEffect } from 'react';

import { CircularProgress, Container } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, Route, Routes } from 'react-router-dom';

import style from './App.module.scss';

import { initializeAppTC } from 'App/AppReducer';
import { ButtonAppBar, ErrorSnackbar, PageNotFound } from 'components';
import { PATH } from 'enums';
import { Login, TodolistList } from 'features';
import { getIsInitializedSelector } from 'selectors/appSelectors/appSelectors';

export const App: FC = () => {
  const dispatch = useDispatch();

  const isInitialized = useSelector(getIsInitializedSelector);

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
          <Route path={PATH.MAIN_WINDOW} element={<TodolistList />} />
          <Route path={PATH.LOGIN} element={<Login />} />
          <Route path={PATH.PAGE_NOT_FOUND} element={<PageNotFound />} />
          <Route path={PATH.ERROR} element={<Navigate to={PATH.PAGE_NOT_FOUND} />} />
        </Routes>
      </Container>
    </div>
  );
};
