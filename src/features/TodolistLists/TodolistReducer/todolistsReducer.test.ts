import { v1 } from 'uuid';

import { RequestStatusType } from '../../../App/AppReducer/types';
import {
  EMPTY_STRING,
  FIRST_ELEMENT_IN_ARRAY,
  SECOND_ELEMENT_IN_ARRAY,
  ZERO_VALUE,
} from '../../../constants';
import { LoadingStatuses } from '../../enums';
import { ActionTodolist } from '../TodolistAction';
import { FilterValuesType, TodolistDomainType } from '../types';

import { todolistsReducer } from './todolistsReducer';

let todolistId1: string;
let todolistId2: string;
let startState: Array<TodolistDomainType> = [];

beforeEach(() => {
  todolistId1 = v1();
  todolistId2 = v1();
  startState = [
    {
      id: todolistId1,
      title: 'What to learn',
      filter: 'all',
      addedDate: EMPTY_STRING,
      order: ZERO_VALUE,
      entityStatus: LoadingStatuses.Idle,
    },
    {
      id: todolistId2,
      title: 'What to buy',
      filter: 'all',
      addedDate: EMPTY_STRING,
      order: 1,
      entityStatus: LoadingStatuses.Idle,
    },
  ];
});

test('correct todolist should be removed', () => {
  const endState = todolistsReducer(
    startState,
    ActionTodolist.removeTodolistAC(todolistId1),
  );
  const currentLength = 1;

  expect(endState.length).toBe(currentLength);
  expect(endState[FIRST_ELEMENT_IN_ARRAY].id).toBe(todolistId2);
});

test('correct todolist should be added', () => {
  const endState = todolistsReducer(
    startState,
    ActionTodolist.addTodolistAC({
      id: todolistId1,
      title: 'New Todolist',
      addedDate: EMPTY_STRING,
      order: ZERO_VALUE,
    }),
  );
  const currentLength = 3;

  expect(endState.length).toBe(currentLength);
  expect(endState[FIRST_ELEMENT_IN_ARRAY].title).toBe('New Todolist');
  expect(endState[FIRST_ELEMENT_IN_ARRAY].filter).toBe('all');
});

test('correct todolist should change its name', () => {
  const newTodolistTitle = 'New Todolist';

  const action = ActionTodolist.changeTodolistTitleAC(todolistId2, newTodolistTitle);

  const endState = todolistsReducer(startState, action);

  expect(endState[FIRST_ELEMENT_IN_ARRAY].title).toBe('What to learn');
  expect(endState[SECOND_ELEMENT_IN_ARRAY].title).toBe(newTodolistTitle);
});

test('correct filter of todolist should be changed', () => {
  const newFilter: FilterValuesType = 'completed';

  const action = ActionTodolist.changeTodolistFilterAC(todolistId2, newFilter);

  const endState = todolistsReducer(startState, action);

  expect(endState[FIRST_ELEMENT_IN_ARRAY].filter).toBe('all');
  expect(endState[SECOND_ELEMENT_IN_ARRAY].filter).toBe(newFilter);
});

test('todolist should be set to the correct', () => {
  const action = ActionTodolist.setTodosAC(startState);

  const endState = todolistsReducer([], action);
  const currentLength = 2;

  expect(endState.length).toBe(currentLength);
});

test('correct entity status of todolist should be changed', () => {
  const newStatus: RequestStatusType = LoadingStatuses.Loading;

  const action = ActionTodolist.changeTodolistEntityStatusAC(todolistId2, newStatus);

  const endState = todolistsReducer(startState, action);

  expect(endState[FIRST_ELEMENT_IN_ARRAY].entityStatus).toBe(LoadingStatuses.Idle);
  expect(endState[SECOND_ELEMENT_IN_ARRAY].entityStatus).toBe(newStatus);
});
