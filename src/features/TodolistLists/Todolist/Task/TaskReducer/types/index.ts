import { Dispatch } from 'redux';

import { ActionAppTypes } from '../../../../../../App/AppReducer/types';
import { InferActionTypes } from '../../../../../../App/store';
import { TaskPriorities, TaskStatuses } from '../../../../../../enums';
import { ActionTodolistTypes } from '../../../../types';
import { taskAction } from '../TaskAction';

export type ThunkDispatchType = Dispatch<ActionsTaskAllType | ActionAppTypes>;

export type ActionsTaskAllType = ActionTaskTypes | ActionTodolistTypes;

export type UpdateDomainTaskModelType = {
  title?: string;
  description?: string;
  status?: TaskStatuses;
  priority?: TaskPriorities;
  startDate?: string;
  deadline?: string;
};

export type ActionTaskTypes = InferActionTypes<typeof taskAction>;
