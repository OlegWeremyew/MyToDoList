import {Provider} from "react-redux";
import {combineReducers, createStore} from "redux";
import {tasksReducer} from "../state/tasksReducer";
import {todolistsReducer} from "../state/todolistsReducer";
import {AppRootStateType} from "../state/store";
import {v1} from "uuid";
import {TaskPriorities, TaskStatuses} from "../api/todolistApi";


const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer
})

const initialGlobalState: AppRootStateType = {
    todolists: [
        {id: "todolistId1", title: "What to learn", filter: "all", addedDate: "", order: 0,},
        {id: "todolistId2", title: "What to buy", filter: "all", addedDate: "", order: 1,},
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
}

export const storyBookStore = createStore(rootReducer, initialGlobalState)


export const ReduxStoreProviderDecorator = (storyFn: () => React.ReactNode) => {
    return <Provider store={storyBookStore}>{storyFn()}</Provider>
}