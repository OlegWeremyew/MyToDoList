import React from 'react';

import { action } from '@storybook/addon-actions';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import { TaskPriorities, TaskStatuses } from '../../../../enums';

import { Task } from './Task';

export default {
  title: 'TODOLIST/Task',
  component: Task,
  args: {
    removeTask: action('delete task'),
    changeTaskStatus: action('Change status'),
    changeTaskTitle: action('Change title'),
    todolistId: 'df',
  },
} as ComponentMeta<typeof Task>;

// eslint-disable-next-line react/jsx-props-no-spreading
const Template: ComponentStory<typeof Task> = args => <Task {...args} />;

export const TaskIsDoneStory = Template.bind({});
TaskIsDoneStory.args = {
  task: {
    id: '1',
    title: 'JS',
    status: TaskStatuses.Completed,
    description: '',
    priority: TaskPriorities.Low,
    startDate: '',
    deadline: '',
    todoListId: '',
    order: 0,
    addedDate: '',
  },
};

export const TaskDoNotDoneStory = Template.bind({});
TaskDoNotDoneStory.args = {
  task: {
    id: '1',
    title: 'JS',
    status: TaskStatuses.New,
    description: '',
    priority: TaskPriorities.Low,
    startDate: '',
    deadline: '',
    todoListId: '',
    order: 0,
    addedDate: '',
  },
};
