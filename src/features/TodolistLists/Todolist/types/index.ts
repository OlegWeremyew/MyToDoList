import { TaskType } from '../../../../api/types';
import { TaskStatuses } from '../../../../enums';
import { FilterValuesType, TodolistDomainType } from '../../types';

export type PropsType = {
  todolist: TodolistDomainType;
  tasks: Array<TaskType>;
  removeTask: (taskId: string, todolistId: string) => void;
  changeFilterCallBack: (value: FilterValuesType, todolistId: string) => void;
  addTaskCallBack: (title: string, todolistId: string) => void;
  changeTaskStatus: (id: string, status: TaskStatuses, todolistId: string) => void;
  removeTodolistCallBack: (id: string) => void;
  changeTodolistTitleCallBack: (id: string, newTitle: string) => void;
  changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void;
};
