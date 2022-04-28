import { TaskType } from '../../../../../../api/types';
import { taskEnumReducer } from '../constants';
import { UpdateDomainTaskModelType } from '../types';

export const taskAction = {
  removeTaskAC(taskId: string, todolistId: string) {
    return {
      type: taskEnumReducer.REMOVE_TASK,
      payload: {
        taskId,
        todolistId,
      },
    } as const;
  },
  addTaskAC(task: TaskType) {
    return {
      type: taskEnumReducer.ADD_TASK,
      payload: {
        task,
      },
    } as const;
  },
  updateTaskAC(taskId: string, model: UpdateDomainTaskModelType, todolistId: string) {
    return {
      type: taskEnumReducer.UPDATE_TASK,
      payload: {
        model,
        todolistId,
        taskId,
      },
    } as const;
  },
  setTasksAC(tasks: Array<TaskType>, todolistId: string) {
    return {
      type: taskEnumReducer.SET_TASKS,
      payload: {
        tasks,
        todolistId,
      },
    } as const;
  },
};
