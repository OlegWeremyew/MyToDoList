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
    let [error, setError] = useState<string | null>(null)


    const addTask = () => {
        const trimTitle = title.trim()
        if (trimTitle) {
            props.addTask(title)
            setTitle("")
        } else {
            setError("empty input is blocked")
        }
    }

    const setChangeTitle = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value)
    const setAllFilterValue = () => props.changeFilter("all")
    const setActiveValue = () => props.changeFilter("active")
    const setComplitedValue = () => props.changeFilter("complited")
    const setOnEnter = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (e.key === "Enter") {
            addTask()
        }
    }

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
                {error && <div className="error-message">{error}</div>}
            </div>
            <ul>
                {tasksJSX}
            </ul>
            <div>
                <button className={props.filter === "all" ? "active-filter" : ""} onClick={setAllFilterValue}>All
                </button>
                <button className={props.filter === "active" ? "active-filter" : ""} onClick={setActiveValue}>Active
                </button>
                <button className={props.filter === "complited" ? "active-filter" : ""}
                        onClick={setComplitedValue}>Completed
                </button>
            </div>
        </div>

    );
}

export default ToDoList;
