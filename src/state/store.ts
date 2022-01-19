import {tasksReducer} from './tasksReducer';
import {todolistsReducer} from './todolistsReducer';
import {combineReducers, createStore} from 'redux';

export type AppRootStateType = ReturnType<typeof rootReducer>

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer,
})

export const store = createStore(rootReducer);

// @ts-ignore
window.store = store;
