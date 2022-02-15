import React from 'react';
import './App.css';

import {Container} from '@material-ui/core';

import {ButtonAppBar} from "../components/ButtonAppBar/ButtonAppBar";
import {TodolistList} from "../TodolistList/TodolistList";

export const App = () => {

    return (
        <div className="App">
            <ButtonAppBar/>
            <Container fixed>
               <TodolistList/>
            </Container>
        </div>
    )
}


