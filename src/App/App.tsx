import React, {useEffect} from 'react';
import style from './App.module.css';

import {CircularProgress, Container} from '@material-ui/core';

import {ButtonAppBar} from "../components/ButtonAppBar/ButtonAppBar";
import {TodolistList} from "../features/TodolistList/TodolistList";
import {ErrorSnackbar} from "../components/ErrorSnackbar/ErrorSnackbar";
import {Login} from "../features/Login/Login";
import {Navigate, Route, Routes} from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./store";
import {initializeAppTC} from "./AppReducer";
import {PATH} from "../utils/RouterPATH";
import {PageNotFound} from "../components/PageNotFound/PageNotFound";
import {getIsInitializedSelector} from "../utils/appSelectors";

export const App: React.FC<PropsType> = ({demo = false}) => {

    const dispatch = useDispatch()
    const isInitialized = useSelector<AppRootStateType, boolean>(getIsInitializedSelector)

    useEffect(() => {
        dispatch(initializeAppTC())
    }, [dispatch, isInitialized])

    if (!isInitialized) {
        return (
            <div className={style.preloader}>
                <CircularProgress/>
            </div>
        )
    }

    return (
        <div>
            <ErrorSnackbar/>
            <ButtonAppBar/>
            <Container fixed>
                <Routes>
                    <Route path={PATH.MAIN_WINDOW} element={<TodolistList demo={demo}/>}/>
                    <Route path={PATH.LOGIN} element={<Login/>}/>

                    <Route path={PATH.PAGE_NOT_FOUND} element={<PageNotFound/>}/>
                    <Route path={PATH.ERROR} element={<Navigate to={PATH.PAGE_NOT_FOUND}/>}/>
                </Routes>
            </Container>
        </div>
    )
}

//type

type PropsType = {
    demo?: boolean
}


