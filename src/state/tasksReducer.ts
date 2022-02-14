import {TasksStateType} from '../App';
import {AddTodolistActionType, RemoveTodolistActionType, setTodosActionType} from './todolistsReducer';
import {TaskStatuses, TaskType, todolistAPI, UpdateTaskModelType} from "../api/todolistApi";
import {Dispatch} from "redux";
import {AppRootStateType} from "./store";

type ActionsType =
    | RemoveTaskActionType
    | AddTaskActionType
    | ChangeTaskStatusActionType
    | ChangeTaskTitleActionType
    | AddTodolistActionType
    | RemoveTodolistActionType
    | setTodosActionType
    | SetTasksActionType

const initialState: TasksStateType = {}

export const tasksReducer = (state: TasksStateType = initialState, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case "SET-TODOS": {
            let stateCopy = {...state}
            action.payload.todos.forEach(f => stateCopy[f.id] = [])
            return stateCopy
        }
        case 'REMOVE-TASK': {
            return {...state, [action.payload.todolistId]:state[action.payload.todolistId].filter(f=>f.id !== action.payload.taskId)}
        }
        case 'ADD-TASK': {
            return {...state, [action.payload.task.todoListId] : [action.payload.task, ...state[action.payload.task.todoListId]]}
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
        case 'SET-TASKS': {
            const stateCopy = {...state}
            stateCopy[action.payload.todolistId] = action.payload.tasks
            return stateCopy
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
export const addTaskAC = (task: TaskType) => {
    return {
        type: 'ADD-TASK',
        payload: {
            task,
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

export type SetTasksActionType = ReturnType<typeof setTasksAC>
export const setTasksAC = (tasks: Array<TaskType>, todolistId: string) => {
    return {
        type: 'SET-TASKS',
        payload: {
            tasks,
            todolistId,
        }
    } as const
}

//Thunk
export const fetchTasksTC = (todolistId: string) => (dispatch: Dispatch) => {
    todolistAPI.getTasks(todolistId)
        .then((res) => {
            const tasks = res.data.items
            dispatch(setTasksAC(tasks, todolistId))
        })
}

export const removeTaskTC = (taskId: string, todolistId: string) => (dispatch: Dispatch) => {
    todolistAPI.deleteTask(todolistId, taskId)
        .then(res => {
            dispatch(removeTaskAC(taskId, todolistId))
        })
}

export const addTaskTC = (todolistId: string, title: string) => (dispatch: Dispatch) => {
    todolistAPI.createTask(todolistId, title)
        .then(res => {
            let task = res.data.data.item
            dispatch(addTaskAC(task))
        })
}

export const updateTaskStatusTC = (taskId: string, todolistId: string, status: TaskStatuses) => (dispatch: Dispatch, getState: () => AppRootStateType) => {

    const allTasksFromState = getState().tasks;
    const tasksForCurrentTodolist = allTasksFromState[todolistId]
    const task = tasksForCurrentTodolist.find(t => {
        return t.id === taskId
    })

    if (task) {

        const model: UpdateTaskModelType = {
            title: task.title,
            startDate: task.startDate,
            priority: task.priority,
            description: task.description,
            deadline: task.deadline,
            status: status
        }
        todolistAPI.updateTask(todolistId, taskId, model)
            .then(() => {
                dispatch(changeTaskStatusAC(taskId, status, todolistId))
            })
    }
}

