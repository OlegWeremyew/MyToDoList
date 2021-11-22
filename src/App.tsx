import React, {useState} from 'react';
import './App.css';
import ToDoList from "./ToDoList";
import {v1} from "uuid";

//CRUD

export type TaskType = {
    id: number
    title: string
    isDone: boolean
}

export type FilterValuesType = "all" | "active" | "complited"

function App() {
    //BLL:
    const todoListTitle: string = "What to learn"
v1()
    const initialState = [
        {id: 1, title: "HTML", isDone: true},
        {id: 2, title: "CSS", isDone: true},
        {id: 3, title: "React", isDone: false},
    ]

    const [tasks, setTasks] = useState<Array<TaskType>>(initialState)
    const [filter, setFilter] = useState<FilterValuesType>("all")

    const changeFilter = (filter: FilterValuesType) => {
        setFilter(filter)
    }

    const removeTask = (taskID: number) => {
        const updateTasks = tasks.filter(task => task.id !== taskID)
        setTasks(updateTasks)
    }

    let tasksForRander = tasks
    if (filter === "active") {
        tasksForRander = tasksForRander.filter(t => t.isDone === false)
    }
    if (filter === "complited") {
        tasksForRander = tasksForRander.filter(t => t.isDone === true)
    }

    //UI:
    return (
        <div className="App">
            <ToDoList title={todoListTitle}
                      tasks={tasksForRander}
                      removeTask={removeTask}
                      changeFilter={changeFilter}
            />
        </div>
    );
}

export default App
