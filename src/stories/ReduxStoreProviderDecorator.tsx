import {Provider} from "react-redux";
import {applyMiddleware, combineReducers, createStore} from "redux";
import {tasksReducer} from "../TodolistList/tasksReducer";
import {todolistsReducer} from "../TodolistList/todolistsReducer";
import {AppRootStateType} from "../App/store";
import {v1} from "uuid";
import {TaskPriorities, TaskStatuses} from "../api/todolistApi";
import {appReducer} from "../App/AppReducer";
import thunk from "redux-thunk";
import {authReducer} from "../features/Login/authReducer";


const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer,
    app: appReducer,
    auth: authReducer,
})

const initialGlobalState: AppRootStateType = {
    todolists: [
        {id: "todolistId1", title: "What to learn", filter: "all", addedDate: "", order: 0, entityStatus: "idle"},
        {id: "todolistId2", title: "What to buy", filter: "all", addedDate: "", order: 1, entityStatus: "loading"},
    ],
    tasks: {
        ["todolistId1"]: [
            {
                id: v1(),
                title: "HTML&CSS",
                status: TaskStatuses.Completed,
                priority: TaskPriorities.Low,
                startDate: "",
                deadline: "",
                todoListId: "todolistId1",
                order: 0,
                addedDate: "",
                description: "",
            },
            {
                id: v1(),
                title: "JS",
                status: TaskStatuses.Completed,
                priority: TaskPriorities.Low,
                startDate: "",
                deadline: "",
                todoListId: "todolistId1",
                order: 0,
                addedDate: "",
                description: "",
            },
        ],
        ["todolistId2"]: [
            {
                id: v1(),
                title: "Bread",
                status: TaskStatuses.Completed,
                priority: TaskPriorities.Low,
                startDate: "",
                deadline: "",
                todoListId: "todolistId2",
                order: 0,
                addedDate: "",
                description: "",
            },
            {
                id: v1(),
                title: "JS",
                status: TaskStatuses.Completed,
                priority: TaskPriorities.Low,
                startDate: "",
                deadline: "",
                todoListId: "todolistId2",
                order: 0,
                addedDate: "",
                description: "",
            },
        ],
    },
    app: {
        status: "idle",
        error: null,
        isInitialized: false,
    },
    auth: {
        isLoggedIn: false,
    },
}

export const storyBookStore = createStore(rootReducer, initialGlobalState, applyMiddleware(thunk))


export const ReduxStoreProviderDecorator = (storyFn: () => React.ReactNode) => {
    return <Provider store={storyBookStore}>
        {storyFn()}
    </Provider>
}