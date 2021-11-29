import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType, TaskType} from "./App";

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskID: string) => void
    changeFilter: (filter: FilterValuesType) => void
    addTask: (newTaskTitle: string) => void
};

const ToDoList = (props: PropsType) => {
    const [title, setTitle] = useState<string>("")
    const addTask = () => {
        title && props.addTask(title)
        setTitle("")
    }

    const setChangeTitle = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value)
    const setAllFilterValue = () => props.changeFilter("all")
    const setActiveValue = () => props.changeFilter("active")
    const setComplitedValue = () => props.changeFilter("complited")
    const setOnEnter = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && title) {
            addTask()
        }
    }

    const tasksJSX = props.tasks.map(task => {
        return (
            <li key={task.id}>
                <input type="checkbox" checked={task.isDone}/>
                <span>{task.title} </span>
                <button onClick={() => {
                    props.removeTask(task.id)
                }}>
                    Del
                </button>
            </li>
        )
    })
    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input
                    value={title}
                    onChange={setChangeTitle}
                    onKeyPress={setOnEnter}
                />
                <button onClick={addTask}>+</button>
            </div>
            <ul>
                {tasksJSX}
            </ul>
            <div>
                <button onClick={setAllFilterValue}>All</button>
                <button onClick={setActiveValue}>Active</button>
                <button onClick={setComplitedValue}>Completed</button>
            </div>
        </div>

    );
}

export default ToDoList;
