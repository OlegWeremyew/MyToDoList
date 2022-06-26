import { TaskType } from '../../../../../api/types';
import { TaskStatuses } from '../../../../../enums';

export type TaskPropsType = {
  todolistId: string;
  task: TaskType;
  removeTask: (taskID: string, todolistID: string) => void;
  changeTaskStatus: (taskID: string, status: TaskStatuses, todolistId: string) => void;
  changeTaskTitle: (taskID: string, newValue: string, todolistID: string) => void;
};
