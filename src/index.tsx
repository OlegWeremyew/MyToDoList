import React from 'react';
import './index.scss';
import ReactDOM from 'react-dom';
import {App} from './App/App';
import {store} from './App/store';
import {Provider} from 'react-redux';
import {HashRouter} from "react-router-dom";

ReactDOM.render(
    <HashRouter>
        <Provider store={store}>
            <App/>
        </Provider>
    </HashRouter>, document.getElementById('root'))

