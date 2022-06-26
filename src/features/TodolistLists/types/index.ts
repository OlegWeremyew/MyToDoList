import { Dispatch } from 'redux';

import { TaskType, TodolistType } from '../../../api/types';
import { ActionAppTypes, RequestStatusType } from '../../../App/AppReducer/types';
import { InferActionTypes } from '../../../App/types';
import { ActionTodolist } from '../TodolistAction';

export type FilterValuesType = 'all' | 'active' | 'completed';

export type TodolistDomainType = TodolistType & {
  filter: FilterValuesType;
  entityStatus: RequestStatusType;
};

export type ThunkDispatchType = Dispatch<ActionTodolistTypes | ActionAppTypes>;

export type ActionTodolistTypes = InferActionTypes<typeof ActionTodolist>;

export type TasksStateType = {
  [key: string]: Array<TaskType>;
};
