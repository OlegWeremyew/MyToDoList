import React, {useState} from 'react';
import './App.css';
import {v1} from 'uuid';
import {TaskType, Todolist} from "./ToDoList";

export type TodolistsType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type FilterValuesType = "all" | "active" | "completed";


type TasksStateType = {
    [key: string]: Array<TaskType>
}

function App() {

    /* let [todolists, setTodolists] = useState<Array<TodolistsType>>([
         {id: v1(), title: 'What to learn', filter: 'all'},
         {id: v1(), title: 'What to buy', filter: 'all'},
     ])
     let [tasks, setTasks] = useState([
         {id: v1(), title: "HTML&CSS", isDone: true},
         {id: v1(), title: "JS", isDone: true},
         {id: v1(), title: "ReactJS", isDone: false},
         {id: v1(), title: "Rest API", isDone: false},
         {id: v1(), title: "GraphQL", isDone: false},
     ]);*/

    let todolistID1 = v1();
    let todolistID2 = v1();

    let [todolists, setTodolists] = useState<Array<TodolistsType>>([
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ])

    let [tasks, setTasks] = useState<TasksStateType>({
        [todolistID1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Rest API", isDone: false},
            {id: v1(), title: "GraphQL", isDone: false},
        ],
        [todolistID2]: [
            {id: v1(), title: "HTML&CSS2", isDone: true},
            {id: v1(), title: "JS2", isDone: true},
            {id: v1(), title: "ReactJS2", isDone: false},
            {id: v1(), title: "Rest API2", isDone: false},
            {id: v1(), title: "GraphQL2", isDone: false},
        ]
    });


    function removeTask(todolistID: string, id: string) {
        //let filteredTasks = tasks.filter(t => t.id != id);
        //setTasks(filteredTasks);
        setTasks({...tasks, [todolistID]: tasks[todolistID].filter(f => f.id !== id)})
    }

    function addTask(todolistID: string, title: string) {
        let mewTask = {id: v1(), title: title, isDone: false};
        //let newTasks = [task, ...tasks];
        //setTasks(newTasks);*/
        setTasks({...tasks, [todolistID]: [mewTask, ...tasks[todolistID]]})

    }

    function changeStatus(todolistID: string, taskId: string, isDone: boolean) {
        //let task = tasks.find(t => t.id === taskId);
        // if (task) {
        //     task.isDone = isDone;
        //  }

        // setTasks([...tasks]);
        setTasks({...tasks, [todolistID]: tasks[todolistID].map(m => m.id === taskId ? {...m, isDone: isDone} : m)})
    }

    function changeFilter(todolistId: string, value: FilterValuesType) {
        //setFilter(value);
        setTodolists(todolists.map(m => m.id === todolistId ? {...m, filter: value} : m))
    }
    const removeTodolist = (todolistID: string) => {
        setTodolists(todolists.filter(f => f.id !== todolistID))
        delete tasks[todolistID]
        setTasks({...tasks})
    }

    return (
        <div className="App">
            {todolists.map(m => {

                let tasksForTodolist = tasks[m.id];

                if (m.filter === "active") {
                    tasksForTodolist = tasks[m.id].filter(t => t.isDone === false);
                }
                if (m.filter === "completed") {
                    tasksForTodolist = tasks[m.id].filter(t => t.isDone === true);
                }

                return (
                    <Todolist
                        key={m.id}
                        todolistID={m.id}
                        title={m.title}
                        tasks={tasksForTodolist}
                        removeTask={removeTask}
                        changeFilter={changeFilter}
                        addTask={addTask}
                        changeTaskStatus={changeStatus}
                        filter={m.filter}
                        removeTodolist={removeTodolist}
                    />)
            })}

        </div>
    );
}

export default App;
