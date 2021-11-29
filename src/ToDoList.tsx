import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType, TaskType} from "./App";

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskID: string) => void
    changeFilter: (filter: FilterValuesType) => void
    addTask: (newTaskTitle: string) => void
    filter: FilterValuesType
};

const ToDoList = (props: PropsType) => {

    const [title, setTitle] = useState<string>("")
    let [error, setError] = useState<boolean>(false)


    const addTask = () => {
        const trimTitle = title.trim()
        if (trimTitle) {
            props.addTask(trimTitle)
        } else {
            setError(true)
        }
        setTitle("")
    }

    const setChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
        setError(false)
    }
    const setAllFilterValue = () => props.changeFilter("all")
    const setActiveValue = () => props.changeFilter("active")
    const setComplitedValue = () => props.changeFilter("complited")
    const setOnEnter = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            addTask()
        }
    }
    const getBtnClassName = (filter: FilterValuesType) => {
        return props.filter === filter ? "active-filter" : ""
    }

    const errorMessage = <div className="error-message">Empty input is blocked</div>

    const tasksJSX = props.tasks.map(task => {

        /*const getClasses = () => task.isDone ? "is-done" : ""*/

        return (
            <li key={task.id} className={task.isDone ? "is-done" : ""}>
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
                    className={error ? "error" : ""}
                />
                <button onClick={addTask}>+</button>
                {error && errorMessage}
            </div>
            <ul>
                {tasksJSX}
            </ul>
            <div>
                <button className={getBtnClassName("all")}
                        onClick={setAllFilterValue}>All
                </button>
                <button className={getBtnClassName("active")}
                        onClick={setActiveValue}>Active
                </button>
                <button className={getBtnClassName("complited")}
                        onClick={setComplitedValue}>Completed
                </button>
            </div>
        </div>

    );
}

export default ToDoList;
