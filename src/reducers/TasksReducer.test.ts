import {TodoListsType} from "../App";
import {TodoListsReducer} from "./TodolistsReducer";


//const todolist: TodoListsType[] //альтернативный
const todolist: Array<TodoListsType> = [
    {id: '1', title: 'What to learn', filter: 'all'},
    {id: '2', title: 'What to buy', filter: 'all'},
]

test('remove todolist', () => {
    const removeTodolist = TodoListsReducer(todolist, {type: "REMOVE-TODOLIST", payload: {todolistId: '1'}})
    expect(removeTodolist[0].id).toBe('2')
    expect(removeTodolist.length).toBe(1)
})

test('change filter todolist', () => {
    const filterTodolist = TodoListsReducer(todolist, {
        type: "CHANGE-FILTER",
        payload: {todolistId: '1', value: "active"}
    })
    expect(filterTodolist[0].filter).toBe("active")
    expect(filterTodolist[1].filter).toBe('all')
})

test('update title todolist', () => {
    const updateTask = TodoListsReducer(todolist, {type: "RENAME-TODOLIST", payload: {todolistId: '1', title: 'Test'}})
    expect(updateTask[0].title).toBe('Test')
    expect(updateTask[1].title).toBe('What to buy')
})

test('add todolist', () => {
    const addTodolist = TodoListsReducer(todolist, {type: "ADD-TODOLIST", payload: {todolistId: '1', title: 'Test'}})
    expect(addTodolist[0].title).toBe('Test')
    expect(addTodolist[0].filter).toBe('all')
    expect(addTodolist.length).toBe(3)
})
