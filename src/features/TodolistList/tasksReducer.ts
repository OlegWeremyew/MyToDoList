import {
    AddTodolistActionType,
    RemoveTodolistActionType,
    setTodosActionType,
    todolistEnumReducer
} from './todolistsReducer';
import {TaskPriorities, TaskStatuses, TaskType, todolistAPI, UpdateTaskModelType} from "../../api/todolistApi";
import {Dispatch} from "redux";
import {AppRootStateType} from "../../App/store";
import {TasksStateType} from "./TodolistList";
import {setAppErrorActionType, setAppStatusAC, setAppStatusActionType} from "../../App/AppReducer";
import {handleServerAppError, handleServerNetworkError} from "../../utils/errorUtils";

const initialState: TasksStateType = {}

export enum taskEnumReducer {
    REMOVE_TASK = 'TODOLIST/TASK_REDUCER/REMOVE_TASK',
    ADD_TASK = 'TODOLIST/TASK_REDUCER/ADD_TASK',
    UPDATE_TASK = 'TODOLIST/TASK_REDUCER/UPDATE_TASK',
    SET_TASKS = 'TODOLIST/TASK_REDUCER/SET-TASKS',
}

export const tasksReducer = (state: TasksStateType = initialState, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case taskEnumReducer.REMOVE_TASK: {
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId]
                    .filter(f => f.id !== action.payload.taskId)
            }
        }
        case taskEnumReducer.ADD_TASK: {
            return {
                ...state,
                [action.payload.task.todoListId]: [action.payload.task, ...state[action.payload.task.todoListId]]
            }
        }
        case taskEnumReducer.UPDATE_TASK: {
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId]
                    .map(m => m.id === action.payload.taskId
                        ? {...m, ...action.payload.model}
                        : m)
            }
        }
        case todolistEnumReducer.ADD_TODOLIST: {
            return {
                ...state,
                [action.payload.todolist.id]: []
            }
        }
        case todolistEnumReducer.REMOVE_TODOLIST: {
            const copyState = {...state};
            delete copyState[action.payload.id];
            return copyState;
        }
        case todolistEnumReducer.SET_TODOS: {
            let stateCopy = {...state}
            action.payload.todos
                .forEach(f => stateCopy[f.id] = [])
            return stateCopy
        }
        case taskEnumReducer.SET_TASKS: {
            return {...state, [action.payload.todolistId]: action.payload.tasks}
        }
        default:
            return state;
    }
}

export type RemoveTaskActionType = ReturnType<typeof removeTaskAC>
export const removeTaskAC = (taskId: string, todolistId: string) => {
    return {
        type: taskEnumReducer.REMOVE_TASK,
        payload: {
            taskId: taskId,
            todolistId: todolistId,
        }
    } as const
}

export type AddTaskActionType = ReturnType<typeof addTaskAC>
export const addTaskAC = (task: TaskType) => {
    return {
        type: taskEnumReducer.ADD_TASK,
        payload: {
            task,
        }
    } as const
}

export type updateTaskActionType = ReturnType<typeof updateTaskAC>
export const updateTaskAC = (taskId: string, model: UpdateDomainTaskModelType, todolistId: string) => {
    return {
        type: taskEnumReducer.UPDATE_TASK,
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
        type: taskEnumReducer.SET_TASKS,
        payload: {
            tasks,
            todolistId,
        }
    } as const
}

//Thunk===================================================================================
export const fetchTasksTC = (todolistId: string) => (dispatch: ThunkDispatchType) => {
    dispatch(setAppStatusAC("loading"))
    todolistAPI.getTasks(todolistId)
        .then((res) => {
            const tasks = res.data.items
            dispatch(setTasksAC(tasks, todolistId))
            dispatch(setAppStatusAC("succeeded"))
        })
}

export const removeTaskTC = (taskId: string, todolistId: string) => (dispatch: ThunkDispatchType) => {
    dispatch(setAppStatusAC("loading"))
    todolistAPI.deleteTask(todolistId, taskId)
        .then(res => {
            dispatch(removeTaskAC(taskId, todolistId))
            dispatch(setAppStatusAC("succeeded"))
        })
}

export const addTaskTC = (todolistId: string, title: string) => (dispatch: ThunkDispatchType) => {
    dispatch(setAppStatusAC("loading"))
    todolistAPI.createTask(todolistId, title)
        .then(res => {
            if (res.data.resultCode === 0) {
                let task = res.data.data.item
                dispatch(addTaskAC(task))
                dispatch(setAppStatusAC("succeeded"))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch((err) => {
            handleServerNetworkError(err, dispatch)
        })
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
                .then((res) => {
                    if (res.data.resultCode === 0) {
                        dispatch(updateTaskAC(taskId, domainModel, todolistId))
                    } else {
                        handleServerAppError(res.data, dispatch)
                    }
                })
                .catch((err) => {
                    handleServerNetworkError(err, dispatch)
                })
        }
    }

//types===============================================
export type ThunkDispatchType = Dispatch<ActionsType | setAppStatusActionType | setAppErrorActionType>

type ActionsType =
    | RemoveTaskActionType
    | AddTaskActionType
    | updateTaskActionType
    | AddTodolistActionType
    | RemoveTodolistActionType
    | setTodosActionType
    | SetTasksActionType

export type UpdateDomainTaskModelType = {
    title?: string
    description?: string
    status?: TaskStatuses
    priority?: TaskPriorities
    startDate?: string
    deadline?: string
}
