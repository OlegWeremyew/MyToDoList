import { TaskPriorities, TaskStatuses } from '../../api/todolistApi';

import { taskAction, tasksReducer } from './tasksReducer';
import { TasksStateType } from './TodolistList';
import { ActionTodolist } from './todolistsReducer';

let startState: TasksStateType = {};
beforeEach(() => {
  startState = {
    todolistId1: [
      {
        id: '1',
        title: 'CSS',
        status: TaskStatuses.New,
        priority: TaskPriorities.Low,
        startDate: '',
        todoListId: 'todolistId1',
        addedDate: '',
        order: 0,
        deadline: '',
        description: '',
      },
      {
        id: '2',
        title: 'JS',
        status: TaskStatuses.Completed,
        priority: TaskPriorities.Low,
        startDate: '',
        todoListId: 'todolistId1',
        addedDate: '',
        order: 0,
        deadline: '',
        description: '',
      },
      {
        id: '3',
        title: 'React',
        status: TaskStatuses.New,
        priority: TaskPriorities.Low,
        startDate: '',
        todoListId: 'todolistId1',
        addedDate: '',
        order: 0,
        deadline: '',
        description: '',
      },
    ],
    todolistId2: [
      {
        id: '1',
        title: 'bread',
        status: TaskStatuses.New,
        priority: TaskPriorities.Low,
        startDate: '',
        todoListId: 'todolistId2',
        addedDate: '',
        order: 0,
        deadline: '',
        description: '',
      },
      {
        id: '2',
        title: 'yogurt',
        status: TaskStatuses.Completed,
        priority: TaskPriorities.Low,
        startDate: '',
        todoListId: 'todolistId2',
        addedDate: '',
        order: 0,
        deadline: '',
        description: '',
      },
      {
        id: '3',
        title: 'milk',
        status: TaskStatuses.New,
        priority: TaskPriorities.Low,
        startDate: '',
        todoListId: 'todolistId2',
        addedDate: '',
        order: 0,
        deadline: '',
        description: '',
      },
    ],
  };
});

test('correct task should be deleted from correct array', () => {
  const action = taskAction.removeTaskAC('2', 'todolistId2');

  const endState = tasksReducer(startState, action);

  expect(endState.todolistId1.length).toBe(3);
  expect(endState.todolistId2.length).toBe(2);
  expect(endState.todolistId2.every(t => t.id != '2')).toBeTruthy();
});

test('correct task should be added to correct array', () => {
  const action = taskAction.addTaskAC({
    todoListId: 'todolistId2',
    title: 'juice',
    status: TaskStatuses.New,
    addedDate: '',
    deadline: '',
    order: 0,
    description: '',
    priority: 0,
    startDate: '',
    id: 'dddddddddddddddddd',
  });

  const endState = tasksReducer(startState, action);

  expect(endState.todolistId1.length).toBe(3);
  expect(endState.todolistId2.length).toBe(4);
  expect(endState.todolistId2[0].id).toBeDefined();
  expect(endState.todolistId2[0].title).toBe('juice');
  expect(endState.todolistId2[0].status).toBe(TaskStatuses.New);
});
test('status of specified task should be changed', () => {
  const action = taskAction.updateTaskAC(
    '2',
    { status: TaskStatuses.New },
    'todolistId2',
  );

  const endState = tasksReducer(startState, action);

  expect(endState.todolistId1[1].status).toBe(TaskStatuses.Completed);
  expect(endState.todolistId2[1].status).toBe(TaskStatuses.New);
});

test('title of specified task should be changed', () => {
  const action = taskAction.updateTaskAC('2', { title: 'yogurt' }, 'todolistId2');

  const endState = tasksReducer(startState, action);

  expect(endState.todolistId1[1].title).toBe('JS');
  expect(endState.todolistId2[1].title).toBe('yogurt');
  expect(endState.todolistId2[0].title).toBe('bread');
});

test('new array should be added when new todolist is added', () => {
  const action = ActionTodolist.addTodolistAC({
    id: 'dff',
    title: 'New Todolist',
    addedDate: '',
    order: 0,
  });

  const endState = tasksReducer(startState, action);

  const keys = Object.keys(endState);
  const newKey = keys.find(k => k !== 'todolistId1' && k !== 'todolistId2');
  if (!newKey) {
    throw Error('new key should be added');
  }

  expect(keys.length).toBe(3);
  expect(endState[newKey]).toEqual([]);
});

test('property with todolistId should be deleted', () => {
  const action = ActionTodolist.removeTodolistAC('todolistId2');

  const endState = tasksReducer(startState, action);

  const keys = Object.keys(endState);

  expect(keys.length).toBe(1);
  expect(endState.todolistId2).not.toBeDefined();
});

test('empty arrays should be added when we set todolist', () => {
  const action = ActionTodolist.setTodosAC([
    { id: '1', title: 'title 1', order: 0, addedDate: '' },
    { id: '2', title: 'title 2', order: 0, addedDate: '' },
  ]);

  const endState = tasksReducer({}, action);

  const keys = Object.keys(endState);

  expect(keys.length).toBe(2);
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

  expect(endState.todolistId1.length).toBe(3);
  expect(endState.todolistId2.length).toBe(0);
});
