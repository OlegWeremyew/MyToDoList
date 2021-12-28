import React from 'react';
import {TasksStateType} from "../App";

export const TasksReducer = (state: TasksStateType, action: TsarType) => {
    switch (action.type) {
        case "REMOVE-TASK": {
          /*  let newState = state[action.payload.todolistId]
            return newState = newState.filter(t => t.id != action.payload.id);*/
            return state
        }
        case "ADD-TASK": {
            return state
        }
        default:
            return state
    }
};

type TsarType = removeTaskType | addTaskType


type removeTaskType = ReturnType<typeof removeTaskAC>
export const removeTaskAC = (id: string, todolistId: string) => {
    return {
        type: "REMOVE-TASK",
        payload: {
            id: id,
            todolistId: todolistId
        }
    } as const
}


type addTaskType = ReturnType<typeof addTaskAC>
export const addTaskAC = (title: string, todolistId: string) => {
    return {
        type: "ADD-TASK",
        payload: {
            title: title,
            todolistId: todolistId
        }
    } as const
}