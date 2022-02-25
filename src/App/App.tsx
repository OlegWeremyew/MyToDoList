import React, {useEffect} from 'react';
import './App.css';

import {CircularProgress, Container} from '@material-ui/core';

import {ButtonAppBar} from "../components/ButtonAppBar/ButtonAppBar";
import {TodolistList} from "../TodolistList/TodolistList";
import {ErrorSnackbar} from "../components/ErrorSnackbar/ErrorSnackbar";
import {Login} from "../features/Login/Login";
import {Navigate, Route, Routes} from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./store";
import {initializeAppTC} from "./AppReducer";

type PropsType = {
    demo?: boolean
}

export const App = ({demo = false}: PropsType) => {

    const isInitialized = useSelector<AppRootStateType, boolean>(state => state.app.isInitialized)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(initializeAppTC())
    },[])

    if (!isInitialized) {
        return <div
            style={{position: 'fixed', top: '40%', textAlign: 'center', width: '100%'}}>
            <CircularProgress/>
        </div>
    }

    return (
        <div className="App">
            <ErrorSnackbar/>
            <ButtonAppBar/>
            <Container fixed>
                <Routes>
                    <Route path="/" element={<TodolistList demo={demo}/>}/>
                    <Route path="login" element={<Login/>}/>

                    <Route path="404" element={<h1 style={{textAlign: "center"}}>404. Page not found</h1>}/>
                    <Route path="*" element={<Navigate to={"404"}/>}/>
                </Routes>
            </Container>
        </div>
    )
}


