import {AddTodolistActionType, RemoveTodolistActionType, setTodosActionType} from './todolistsReducer';
import {TaskPriorities, TaskStatuses, TaskType, todolistAPI, UpdateTaskModelType} from "../api/todolistApi";
import {Dispatch} from "redux";
import {AppRootStateType} from "../App/store";
import {TasksStateType} from "./TodolistList";
import {setErrorAC, setErrorActionType, setStatusAC, setStatusActionType} from "../App/AppReducer";

type ActionsType =
    | RemoveTaskActionType
    | AddTaskActionType
    | updateTaskActionType
    | AddTodolistActionType
    | RemoveTodolistActionType
    | setTodosActionType
    | SetTasksActionType

const initialState: TasksStateType = {}

export const tasksReducer = (state: TasksStateType = initialState, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId]
                    .filter(f => f.id !== action.payload.taskId)
            }
        }
        case 'ADD-TASK': {
            return {
                ...state,
                [action.payload.task.todoListId]: [action.payload.task, ...state[action.payload.task.todoListId]]
            }
        }
        case 'UPDATE-TASK': {
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId]
                    .map(m => m.id === action.payload.taskId
                        ? {...m, ...action.payload.model}
                        : m)
            }
        }
        case 'ADD-TODOLIST': {
            return {
                ...state,
                [action.payload.todolist.id]: []
            }
        }
        case 'REMOVE-TODOLIST': {
            const copyState = {...state};
            delete copyState[action.payload.id];
            return copyState;
        }
        case "SET-TODOS": {
            let stateCopy = {...state}
            action.payload.todos
                .forEach(f => stateCopy[f.id] = [])
            return stateCopy
        }
        case 'SET-TASKS': {
            return {...state, [action.payload.todolistId]: action.payload.tasks}
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

export type updateTaskActionType = ReturnType<typeof updateTaskAC>
export const updateTaskAC = (taskId: string, model: UpdateDomainTaskModelType, todolistId: string) => {
    return {
        type: 'UPDATE-TASK',
        payload: {
            model,
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

//Thunk===================================================================================
export const fetchTasksTC = (todolistId: string) => (dispatch: ThunkDispatchType) => {
    dispatch(setStatusAC("loading"))
    todolistAPI.getTasks(todolistId)
        .then((res) => {
            const tasks = res.data.items
            dispatch(setTasksAC(tasks, todolistId))
            dispatch(setStatusAC("succeeded"))
        })
}

export const removeTaskTC = (taskId: string, todolistId: string) => (dispatch: ThunkDispatchType) => {
    dispatch(setStatusAC("loading"))
    todolistAPI.deleteTask(todolistId, taskId)
        .then(res => {
            dispatch(removeTaskAC(taskId, todolistId))
            dispatch(setStatusAC("succeeded"))
        })
}

export const addTaskTC = (todolistId: string, title: string) => (dispatch: Dispatch<ActionsType | setErrorActionType | setStatusActionType>) => {
    dispatch(setStatusAC("loading"))
    todolistAPI.createTask(todolistId, title)
        .then(res => {
            if (res.data.resultCode === 0) {
                let task = res.data.data.item
                dispatch(addTaskAC(task))
                dispatch(setStatusAC("succeeded"))
            } else {
                if (res.data.messages.length) {
                    dispatch(setErrorAC(res.data.messages[0]))
                } else {
                    dispatch(setErrorAC("Some error"))
                }
                dispatch(setStatusAC("failed"))
            }
        })
}

export type UpdateDomainTaskModelType = {
    title?: string
    description?: string
    status?: TaskStatuses
    priority?: TaskPriorities
    startDate?: string
    deadline?: string
}

export const updateTaskTC = (taskId: string, todolistId: string, domainModel: UpdateDomainTaskModelType) =>
    (dispatch: ThunkDispatchType, getState: () => AppRootStateType) => {

        const allTasksFromState = getState().tasks;
        const tasksForCurrentTodolist = allTasksFromState[todolistId]
        const task = tasksForCurrentTodolist.find(t => {
            return t.id === taskId
        })

        if (task) {
            const apiModel: UpdateTaskModelType = {
                title: task.title,
                startDate: task.startDate,
                priority: task.priority,
                description: task.description,
                deadline: task.deadline,
                status: task.status,
                ...domainModel,
            }
            todolistAPI.updateTask(todolistId, taskId, apiModel)
                .then(() => {
                    dispatch(updateTaskAC(taskId, domainModel, todolistId))
                })
        }
    }


export type ThunkDispatchType = Dispatch<ActionsType | setStatusActionType>
