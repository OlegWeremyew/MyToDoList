import React from 'react';
import './App.css';

import {Container} from '@material-ui/core';

import {ButtonAppBar} from "../components/ButtonAppBar/ButtonAppBar";
import {TodolistList} from "../TodolistList/TodolistList";
import {ErrorSnackbar} from "../components/ErrorSnackbar/ErrorSnackbar";

type PropsType = {
    demo?: boolean
}

export const App = ({demo = false}: PropsType) => {

    return (
        <div className="App">
            <ErrorSnackbar/>
            <ButtonAppBar/>
            <Container fixed>
                <TodolistList demo={demo}/>
            </Container>
        </div>
    )
}


