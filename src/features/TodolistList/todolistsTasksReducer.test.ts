import {addTodolistAC, TodolistDomainType, todolistsReducer} from './todolistsReducer';
import {tasksReducer} from './tasksReducer';
import {TasksStateType} from "./TodolistList";

test('ids should be equals', () => {
    const startTasksState: TasksStateType = {};
    const startTodolistsState: Array<TodolistDomainType> = [];

    const action = addTodolistAC({
        todolist: {
            id: "dfdf",
            title: "New Todolist",
            addedDate: "",
            order: 0
        }
    })

    const endTasksState = tasksReducer(startTasksState, action)
    const endTodolistsState = todolistsReducer(startTodolistsState, action)

    const keys = Object.keys(endTasksState);
    const idFromTasks = keys[0];
    const idFromTodolists = endTodolistsState[0].id;

    expect(idFromTasks).toBe(action.payload.todolist.id);
    expect(idFromTodolists).toBe(action.payload.todolist.id);
});
