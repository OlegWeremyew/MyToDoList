import React from 'react';
import './App.css';

import {Container} from '@material-ui/core';

import {ButtonAppBar} from "../components/ButtonAppBar/ButtonAppBar";
import {TodolistList} from "../TodolistList/TodolistList";
import {ErrorSnackbar} from "../components/ErrorSnackbar/ErrorSnackbar";
import {Login} from "../features/Login/Login";
import {Navigate, Route, Routes} from 'react-router-dom';

type PropsType = {
    demo?: boolean
}

export const App = ({demo = false}: PropsType) => {

    return (
        <div className="App">
            <ErrorSnackbar/>
            <ButtonAppBar/>
            <Container fixed>
                <Routes>
                    <Route path="/" element={<TodolistList demo={demo}/>}/>
                    <Route path="login" element={<Login/>}/>

                    <Route path="/404" element={<h1 style={{textAlign: "center"}}>404. Page not found</h1>}/>
                    <Route path="*" element={<Navigate to={"/404"}/>}/>
                </Routes>
            </Container>
        </div>
    )
}


