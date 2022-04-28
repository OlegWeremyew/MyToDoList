import { Dispatch } from 'redux';

import { TodolistType } from '../../../api/types';
import { ActionAppTypes, RequestStatusType } from '../../../App/AppReducer/types';
import { InferActionTypes } from '../../../App/store';
import { ActionTodolist } from '../TodolistAction';

export type FilterValuesType = 'all' | 'active' | 'completed';

export type TodolistDomainType = TodolistType & {
  filter: FilterValuesType;
  entityStatus: RequestStatusType;
};

export type ThunkDispatchType = Dispatch<ActionTodolistTypes | ActionAppTypes>;

export type ActionTodolistTypes = InferActionTypes<typeof ActionTodolist>;
