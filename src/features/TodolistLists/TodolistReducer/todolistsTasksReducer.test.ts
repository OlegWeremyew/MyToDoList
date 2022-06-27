import { EMPTY_STRING, FIRST_ELEMENT_IN_ARRAY } from 'constants/variables';
import { ActionTodolist, tasksReducer, todoListsReducer } from 'features/TodolistLists';
import { TasksStateType, TodolistDomainType } from 'features/TodolistLists/types';

test('ids should be equals', () => {
  const startTasksState: TasksStateType = {};
  const startToDoListsState: Array<TodolistDomainType> = [];

  const action = ActionTodolist.addTodolistAC({
    id: 'up',
    title: 'New Todolist',
    addedDate: EMPTY_STRING,
    order: 0,
  });

  const endTasksState = tasksReducer(startTasksState, action);
  const endToDoListsState = todoListsReducer(startToDoListsState, action);

  const keys = Object.keys(endTasksState);
  const idFromTasks = keys[FIRST_ELEMENT_IN_ARRAY];
  const idFromToDoLists = endToDoListsState[FIRST_ELEMENT_IN_ARRAY].id;

  expect(idFromTasks).toBe(action.payload.todolist.id);
  expect(idFromToDoLists).toBe(action.payload.todolist.id);
});
