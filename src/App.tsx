import React, {useState} from 'react';
import './App.css';
import ToDoList from "./ToDoList";
import {v1} from "uuid";

//CRUD

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type FilterValuesType = "all" | "active" | "complited"

function App() {
    //BLL:
    const todoListTitle: string = "What to learn"
    const initialState = [
        {id: v1(), title: "HTML", isDone: true},
        {id: v1(), title: "CSS", isDone: true},
        {id: v1(), title: "JavaScrips", isDone: false},
        {id: v1(), title: "React", isDone: true},
        {id: v1(), title: "Angular", isDone: false},
        {id: v1(), title: "Ruby", isDone: true},
        {id: v1(), title: "NoteJS", isDone: true},
    ]

    const [tasks, setTasks] = useState<Array<TaskType>>(initialState)
    const [filter, setFilter] = useState<FilterValuesType>("all")

    const changeFilter = (filter: FilterValuesType) => {
        setFilter(filter)
    }

    const removeTask = (taskID: string) => {
        const updateTasks = tasks.filter(task => task.id !== taskID)
        setTasks(updateTasks)
    }

    const addTask = (newTaskTitle: string) => {
        /*const newTaskTitle: string = "New task"*/
        const newTask: TaskType = {
            id: v1(),
            title: newTaskTitle,
            isDone: false
        }
        setTasks([newTask, ...tasks])
    }

    const changeTaskStatus = (taskID: string, isDone: boolean) => {
        const updatedTasks = tasks.map(t => t.id === taskID ? {...t, isDone: isDone} : t)
        setTasks(updatedTasks)
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
                      addTask={addTask}
                      filter={filter}
                      changeTaskStatus={changeTaskStatus}
            />
        </div>
    );
}

export default App
