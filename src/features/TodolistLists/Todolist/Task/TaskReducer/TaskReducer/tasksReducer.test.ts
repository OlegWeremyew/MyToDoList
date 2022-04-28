import {
  EMPTY_STRING,
  FIRST_ELEMENT_IN_ARRAY,
  SECOND_ELEMENT_IN_ARRAY,
  ZERO_VALUE,
} from '../../../../../../constants';
import { TaskPriorities, TaskStatuses } from '../../../../../../enums';
import { ActionTodolist } from '../../../../TodolistAction';
import { TasksStateType } from '../../../../TodolistList';
import { taskAction } from '../TaskAction';

import { tasksReducer } from './tasksReducer';

let startState: TasksStateType = {};
beforeEach(() => {
  startState = {
    todolistId1: [
      {
        id: '1',
        title: 'CSS',
        status: TaskStatuses.New,
        priority: TaskPriorities.Low,
        startDate: EMPTY_STRING,
        todoListId: 'todolistId1',
        addedDate: EMPTY_STRING,
        order: ZERO_VALUE,
        deadline: EMPTY_STRING,
        description: EMPTY_STRING,
      },
      {
        id: '2',
        title: 'JS',
        status: TaskStatuses.Completed,
        priority: TaskPriorities.Low,
        startDate: EMPTY_STRING,
        todoListId: 'todolistId1',
        addedDate: EMPTY_STRING,
        order: ZERO_VALUE,
        deadline: EMPTY_STRING,
        description: EMPTY_STRING,
      },
      {
        id: '3',
        title: 'React',
        status: TaskStatuses.New,
        priority: TaskPriorities.Low,
        startDate: EMPTY_STRING,
        todoListId: 'todolistId1',
        addedDate: EMPTY_STRING,
        order: ZERO_VALUE,
        deadline: EMPTY_STRING,
        description: EMPTY_STRING,
      },
    ],
    todolistId2: [
      {
        id: '1',
        title: 'bread',
        status: TaskStatuses.New,
        priority: TaskPriorities.Low,
        startDate: EMPTY_STRING,
        todoListId: 'todolistId2',
        addedDate: EMPTY_STRING,
        order: ZERO_VALUE,
        deadline: EMPTY_STRING,
        description: EMPTY_STRING,
      },
      {
        id: '2',
        title: 'yogurt',
        status: TaskStatuses.Completed,
        priority: TaskPriorities.Low,
        startDate: EMPTY_STRING,
        todoListId: 'todolistId2',
        addedDate: EMPTY_STRING,
        order: ZERO_VALUE,
        deadline: EMPTY_STRING,
        description: EMPTY_STRING,
      },
      {
        id: '3',
        title: 'milk',
        status: TaskStatuses.New,
        priority: TaskPriorities.Low,
        startDate: EMPTY_STRING,
        todoListId: 'todolistId2',
        addedDate: EMPTY_STRING,
        order: ZERO_VALUE,
        deadline: EMPTY_STRING,
        description: EMPTY_STRING,
      },
    ],
  };
});

test('correct task should be deleted from correct array', () => {
  const action = taskAction.removeTaskAC('2', 'todolistId2');

  const endState = tasksReducer(startState, action);
  const currentLengthTodolistId1 = 3;
  const currentLengthTodolistId2 = 2;

  expect(endState.todolistId1.length).toBe(currentLengthTodolistId1);
  expect(endState.todolistId2.length).toBe(currentLengthTodolistId2);
  expect(endState.todolistId2.every(t => t.id !== '2')).toBeTruthy();
});

test('correct task should be added to correct array', () => {
  const action = taskAction.addTaskAC({
    todoListId: 'todolistId2',
    title: 'juice',
    status: TaskStatuses.New,
    addedDate: EMPTY_STRING,
    deadline: EMPTY_STRING,
    order: ZERO_VALUE,
    description: EMPTY_STRING,
    priority: ZERO_VALUE,
    startDate: EMPTY_STRING,
    id: 'dddddddddddddddddd',
  });

  const endState = tasksReducer(startState, action);
  const currentLengthTodolistId1 = 3;
  const currentLengthTodolistId2 = 4;

  expect(endState.todolistId1.length).toBe(currentLengthTodolistId1);
  expect(endState.todolistId2.length).toBe(currentLengthTodolistId2);
  expect(endState.todolistId2[FIRST_ELEMENT_IN_ARRAY].id).toBeDefined();
  expect(endState.todolistId2[FIRST_ELEMENT_IN_ARRAY].title).toBe('juice');
  expect(endState.todolistId2[FIRST_ELEMENT_IN_ARRAY].status).toBe(TaskStatuses.New);
});
test('status of specified task should be changed', () => {
  const action = taskAction.updateTaskAC(
    '2',
    { status: TaskStatuses.New },
    'todolistId2',
  );

  const endState = tasksReducer(startState, action);

  expect(endState.todolistId1[SECOND_ELEMENT_IN_ARRAY].status).toBe(
    TaskStatuses.Completed,
  );
  expect(endState.todolistId2[SECOND_ELEMENT_IN_ARRAY].status).toBe(TaskStatuses.New);
});

test('title of specified task should be changed', () => {
  const action = taskAction.updateTaskAC('2', { title: 'yogurt' }, 'todolistId2');

  const endState = tasksReducer(startState, action);

  expect(endState.todolistId1[SECOND_ELEMENT_IN_ARRAY].title).toBe('JS');
  expect(endState.todolistId2[SECOND_ELEMENT_IN_ARRAY].title).toBe('yogurt');
  expect(endState.todolistId2[FIRST_ELEMENT_IN_ARRAY].title).toBe('bread');
});

test('new array should be added when new todolist is added', () => {
  const action = ActionTodolist.addTodolistAC({
    id: 'dff',
    title: 'New Todolist',
    addedDate: EMPTY_STRING,
    order: ZERO_VALUE,
  });

  const endState = tasksReducer(startState, action);

  const keys = Object.keys(endState);
  const newKey = keys.find(k => k !== 'todolistId1' && k !== 'todolistId2');
  if (!newKey) {
    throw Error('new key should be added');
  }
  const currentLength = 3;

  expect(keys.length).toBe(currentLength);
  expect(endState[newKey]).toEqual([]);
});

test('property with todolistId should be deleted', () => {
  const action = ActionTodolist.removeTodolistAC('todolistId2');

  const endState = tasksReducer(startState, action);

  const keys = Object.keys(endState);
  const currentLength = 1;

  expect(keys.length).toBe(currentLength);
  expect(endState.todolistId2).not.toBeDefined();
});

test('empty arrays should be added when we set todolist', () => {
  const action = ActionTodolist.setTodosAC([
    { id: '1', title: 'title 1', order: ZERO_VALUE, addedDate: EMPTY_STRING },
    { id: '2', title: 'title 2', order: ZERO_VALUE, addedDate: EMPTY_STRING },
  ]);

  const endState = tasksReducer({}, action);

  const keys = Object.keys(endState);
  const currentLength = 2;

  expect(keys.length).toBe(currentLength);
  expect(endState['1']).toStrictEqual([]);
  expect(endState['2']).toStrictEqual([]);
});

test('task should be added in todolist', () => {
  const action = taskAction.setTasksAC(startState.todolistId1, 'todolistId1');

  const endState = tasksReducer(
    {
      todolistId2: [],
      todolistId1: [],
    },
    action,
  );
  const currentLengthTodolistId1 = 3;
  const currentLengthTodolistId2 = ZERO_VALUE;

  expect(endState.todolistId1.length).toBe(currentLengthTodolistId1);
  expect(endState.todolistId2.length).toBe(currentLengthTodolistId2);
});
