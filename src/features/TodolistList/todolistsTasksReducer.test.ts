import { tasksReducer } from './tasksReducer';
import { TasksStateType } from './TodolistList';
import { ActionTodolist, TodolistDomainType, todolistsReducer } from './todolistsReducer';

test('ids should be equals', () => {
  const startTasksState: TasksStateType = {};
  const startToDoListsState: Array<TodolistDomainType> = [];

  const action = ActionTodolist.addTodolistAC({
    id: 'dfdf',
    title: 'New Todolist',
    addedDate: '',
    order: 0,
  });

  const endTasksState = tasksReducer(startTasksState, action);
  const endToDoListsState = todolistsReducer(startToDoListsState, action);

  const keys = Object.keys(endTasksState);
  const idFromTasks = keys[0];
  const idFromToDoLists = endToDoListsState[0].id;

  expect(idFromTasks).toBe(action.payload.todolist.id);
  expect(idFromToDoLists).toBe(action.payload.todolist.id);
});
