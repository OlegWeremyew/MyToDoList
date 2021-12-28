import {TasksStateType} from "../App";
import {TasksReducer} from "./TasksReducer";


const tasks: TasksStateType = {
    ['1']: [
        {id: '1', title: "HTML&CSS", isDone: true},
        {id: '2', title: "JS", isDone: true},
        {id: '3', title: "ReactJS", isDone: false},
        {id: '4', title: "Rest API", isDone: false},
        {id: '5', title: "GraphQL", isDone: false},
    ],

}

test('remove task', ()=>{
    const removeTask = TasksReducer(tasks,{type:"REMOVE-TASK", payload:{ todolistId: '1', taskId: '2'}})
    expect(removeTask['1'][1].id).toBe('3')
    expect(removeTask['1'].length).toBe(4)
})

test('change isDone task', ()=>{
    const isDoneTask = TasksReducer(tasks,{type:"CHANGE-STATUS-TASK", payload:{ todolistId: '1', taskId: '2', isDone: false}})
    expect(isDoneTask['1'][1].isDone).toBe( false)
    expect(isDoneTask['1'][1].title).toBe( 'JS')
})

test('update title task', ()=>{
    const updateTask = TasksReducer(tasks,{type:"RENAME-TASK", payload:{ todolistId: '1', taskId: '2', title: 'Test'}})
    expect(updateTask['1'][1].title).toBe( 'Test')
    expect(updateTask['1'][1].isDone).toBe( true)
})

test('add todolist task', ()=>{
    const addTodolistTask = TasksReducer(tasks,{type:"ADD-TODOLIST-TASKS", payload:{ todolistId: '2'}})
    expect(addTodolistTask['2'].length).toBe( 0)
})

test('remove tasks', ()=>{
    const removeTasks = TasksReducer(tasks,{type:"REMOVE-TASKS", payload:{ todolistId: '1'}})
    expect(removeTasks['1']).toBe( undefined)
})

test('add task', ()=>{
    const addTask = TasksReducer(tasks,{type:"ADD-TASK", payload:{ todolistId: '1', title: 'Test'}})
    expect(addTask['1'][0].title).toBe( 'Test')
    expect(addTask['1'][0].isDone).toBe( false)
    expect(addTask['1'].length).toBe( 6)
})
