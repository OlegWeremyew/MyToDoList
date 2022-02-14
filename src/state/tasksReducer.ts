import {TasksStateType} from '../App';
import {v1} from 'uuid';
import {AddTodolistActionType, RemoveTodolistActionType, setTodosActionType} from './todolistsReducer';
import {TaskPriorities, TaskStatuses, TaskType} from "../api/todolistApi";

type ActionsType = RemoveTaskActionType
    | AddTaskActionType
    | ChangeTaskStatusActionType
    | ChangeTaskTitleActionType
    | AddTodolistActionType
    | RemoveTodolistActionType
    | setTodosActionType

const initialState: TasksStateType = {}

export const tasksReducer = (state: TasksStateType = initialState, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case "SET-TODOS": {
           let copyState =  {...state}
            action.payload.todos.forEach(f=>{
                copyState[f.id] = []
            })
            return copyState
        }
        case 'REMOVE-TASK': {
            const stateCopy = {...state}
            const tasks = stateCopy[action.payload.todolistId];
            const newTasks = tasks.filter(t => t.id !== action.payload.taskId);
            stateCopy[action.payload.todolistId] = newTasks;
            return stateCopy;
        }
        case 'ADD-TASK': {
            const stateCopy = {...state}
            const newTask: TaskType = {
                id: v1(),
                title: action.payload.title,
                status: TaskStatuses.New,
                priority: TaskPriorities.Low,
                startDate: "",
                deadline: "",
                todoListId: action.payload.todolistId,
                order: 0,
                addedDate: "",
                description: "",
            }
            const tasks = stateCopy[action.payload.todolistId];
            const newTasks = [newTask, ...tasks];
            stateCopy[action.payload.todolistId] = newTasks;
            return stateCopy;
        }
        case 'CHANGE-TASK-STATUS': {
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId]
                    .map(t => (t.id === action.payload.taskId)
                        ? {...t, status: action.payload.status}
                        : t)
            }
        }
        case 'CHANGE-TASK-TITLE': {
            let todolistTasks = state[action.payload.todolistId];
            state[action.payload.todolistId] = todolistTasks
                .map(t => t.id === action.payload.taskId
                    ? {...t, title: action.payload.title}
                    : t);
            return ({...state});
        }
        case 'ADD-TODOLIST': {
            return {
                ...state,
                [action.payload.todolistId]: []
            }
        }
        case 'REMOVE-TODOLIST': {
            const copyState = {...state};
            delete copyState[action.payload.id];
            return copyState;
        }
        default:
            return state;
    }
}

export type RemoveTaskActionType = ReturnType<typeof removeTaskAC>
export const removeTaskAC = (taskId: string, todolistId: string) => {
    return {
        type: 'REMOVE-TASK',
        payload: {
            taskId: taskId,
            todolistId: todolistId,
        }
    } as const
}

export type AddTaskActionType = ReturnType<typeof addTaskAC>
export const addTaskAC = (title: string, todolistId: string) => {
    return {
        type: 'ADD-TASK',
        payload: {
            title, todolistId,
        }
    } as const
}

export type ChangeTaskStatusActionType = ReturnType<typeof changeTaskStatusAC>
export const changeTaskStatusAC = (taskId: string, status: TaskStatuses, todolistId: string) => {
    return {
        type: 'CHANGE-TASK-STATUS',
        payload: {
            status,
            todolistId,
            taskId,
        }
    } as const
}

export type ChangeTaskTitleActionType = ReturnType<typeof changeTaskTitleAC>
export const changeTaskTitleAC = (taskId: string, title: string, todolistId: string) => {
    return {
        type: 'CHANGE-TASK-TITLE',
        payload: {
            title,
            todolistId,
            taskId,
        }
    } as const
}
