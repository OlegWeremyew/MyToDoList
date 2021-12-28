import React, {useReducer} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from 'uuid';
import {AddItemForm} from "./components/AddItemForm";
import ButtonAppBar from "./components/ButtonAppBar";
import {addTaskAC, addTodolistTasksAC, changeStatusAC, removeTaskAC, removeTasksAC, renameTaskAC, TasksReducer} from "./reducers/TasksReducer";
import {addTodoListAC, changeFilterAC, removeTodolistAC, renameTodoListAC, TodoListsReducer} from "./reducers/TodolistsReducer";
import {Container, Grid, Paper} from "@material-ui/core";

export type FilterValuesType = "all" | "active" | "completed";

export type TodoListsType = {
    id: string,
    title: string,
    filter: FilterValuesType
}
export type TasksStateType = {
    [key: string]: TaskType[]
}

function App() {

    let todolistID1 = v1();
    let todolistID2 = v1();

    let [todoLists, todolistDispatch] = useReducer(TodoListsReducer, [
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ])

    let [tasks, tasksDispatch] = useReducer(TasksReducer, {
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
    console.log(tasks)

    //Tasks=====================================================

    function addTask(todolistId: string, title: string) {
        // let newTask = {id: v1(), title: title, isDone: false};
        tasksDispatch(addTaskAC(todolistId, title))
        // setTasks({...tasks, [todolistId]: [newTask, ...tasks[todolistId]]})
    }

    function removeTask(todolistId: string, taskId: string) {
        tasksDispatch(removeTaskAC(todolistId, taskId))
        // setTasks({...tasks, [todolistId]: tasks[todolistId].filter(t => t.id !== id)})
    }

    function changeStatus(todolistId: string, taskId: string, isDone: boolean) {
        tasksDispatch(changeStatusAC(todolistId, taskId, isDone))
        // setTasks({...tasks, [todolistId]: tasks[todolistId].map(m => m.id === taskId ? {...m, isDone} : m)})
    }

    const renameTask = (todolistId: string, taskId: string, title: string) => {
        tasksDispatch(renameTaskAC(todolistId, taskId, title))
        // setTasks({...tasks, [todolistId]: tasks[todolistId].map(m => m.id === idTask ? {...m, title} : m)})
    }

    //=====================================================


    //Todolists=====================================================

    function changeFilter(todolistId: string, value: FilterValuesType) {
        todolistDispatch(changeFilterAC(todolistId, value))
    }

    const removeTodolist = (todolistId: string) => {
        todolistDispatch(removeTodolistAC(todolistId))
        tasksDispatch(removeTasksAC(todolistId))
    }

    const renameTodoList = (todolistId: string, title: string) => {
        todolistDispatch(renameTodoListAC(todolistId, title))
    }

    const addTodoList = (title: string) => {
        const newId = v1()
        todolistDispatch(addTodoListAC(newId, title))
        tasksDispatch(addTodolistTasksAC(newId))
    }

    //=====================================================

    return (
        <div>
            <ButtonAppBar/>
            <Container fixed>
                <Grid container justifyContent={"center"} style={{padding: "20px"}}>
                    <AddItemForm label={'Name Todolist'} addTask={addTodoList}/>
                </Grid>
                <Grid container spacing={3}>

                    {todoLists.map(m => {

                        let tasksForTodolist = tasks[m.id];

                        if (m.filter === "active") {
                            tasksForTodolist = tasks[m.id].filter(t => !t.isDone);
                        }
                        if (m.filter === "completed") {
                            tasksForTodolist = tasks[m.id].filter(t => t.isDone);
                        }

                        return (
                            <Grid key={m.id} item>
                                <Paper style={{padding: "10px"}}>
                                    <Todolist
                                        key={m.id}
                                        todolistId={m.id}
                                        title={m.title}
                                        filter={m.filter}
                                        tasks={tasksForTodolist}
                                        addTask={addTask}
                                        removeTask={removeTask}
                                        changeTaskStatus={changeStatus}
                                        renameTask={renameTask}
                                        changeFilter={changeFilter}
                                        removeTodolist={removeTodolist}
                                        renameTodoList={renameTodoList}
                                    />

                                </Paper>
                            </Grid>
                        )
                    })}
                </Grid>

            </Container>
        </div>
    );
}

export default App;
