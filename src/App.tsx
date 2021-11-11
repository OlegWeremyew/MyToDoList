import React from 'react';
import './App.css';
import ToDoList from "./ToDoList";

//CRUD

export type TaskType = {
    id: number;
    title: string;
    isDone: boolean;
}

function App() {
    //BLL:
    const todoListTitleOne: string = "What to learn";
    const todoListTitleTwo: string = "What to buy";
    const todoListTitleThree: string = "What to watch";

    const task_1: Array<TaskType> = [
        {id: 1, title: "HTML", isDone: true},
        {id: 2, title: "CSS", isDone: true},
        {id: 2, title: "React", isDone: false},
    ];
    const task_2: Array<TaskType> = [
        {id: 4, title: "Meat", isDone: false},
        {id: 5, title: "Beer", isDone: false},
        {id: 6, title: "Milk", isDone: true},
    ];
    //UI:
    return (
        <div className="App">
            <ToDoList title={todoListTitleOne}
                      tasks={task_1}/>
            <ToDoList title={todoListTitleTwo}
                      tasks={task_2}/>
        </div>
    );
}

export default App;
