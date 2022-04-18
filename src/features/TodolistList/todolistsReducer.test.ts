import {
    ActionTodolist, FilterValuesType,
    TodolistDomainType,
    todolistsReducer
} from './todolistsReducer';
import {v1} from 'uuid';
import {RequestStatusType} from "../../App/AppReducer";

let todolistId1: string;
let todolistId2: string;
let startState: Array<TodolistDomainType> = [];

beforeEach(() => {
    todolistId1 = v1();
    todolistId2 = v1();
    startState = [
        {id: todolistId1, title: "What to learn", filter: "all", addedDate: "", order: 0, entityStatus: "idle"},
        {id: todolistId2, title: "What to buy", filter: "all", addedDate: "", order: 1, entityStatus: "idle"},
    ]
})

test('correct todolist should be removed', () => {
    const endState = todolistsReducer(startState, ActionTodolist.removeTodolistAC(todolistId1))

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todolistId2);
})

test('correct todolist should be added', () => {

    const endState = todolistsReducer(startState, ActionTodolist.addTodolistAC({
        id: todolistId1,
        title: "New Todolist",
        addedDate: "",
        order: 0
    }))

    expect(endState.length).toBe(3);
    expect(endState[0].title).toBe("New Todolist");
    expect(endState[0].filter).toBe("all");
})

test('correct todolist should change its name', () => {
    let newTodolistTitle = "New Todolist";

    const action = ActionTodolist.changeTodolistTitleAC(todolistId2, newTodolistTitle);

    const endState = todolistsReducer(startState, action);

    expect(endState[0].title).toBe("What to learn");
    expect(endState[1].title).toBe(newTodolistTitle);
})

test('correct filter of todolist should be changed', () => {
    let newFilter: FilterValuesType = "completed";

    const action = ActionTodolist.changeTodolistFilterAC(todolistId2, newFilter);

    const endState = todolistsReducer(startState, action);

    expect(endState[0].filter).toBe("all");
    expect(endState[1].filter).toBe(newFilter);
})

test('todolist should be set to the correct', () => {
    const action = ActionTodolist.setTodosAC(startState);

    const endState = todolistsReducer([], action);

    expect(endState.length).toBe(2);
})

test('correct entity status of todolist should be changed', () => {
    let newStatus: RequestStatusType = "loading";

    const action = ActionTodolist.changeTodolistEntityStatusAC(todolistId2, newStatus);

    const endState = todolistsReducer(startState, action);

    expect(endState[0].entityStatus).toBe("idle");
    expect(endState[1].entityStatus).toBe(newStatus);
})
