import React from 'react';
import {ComponentStory, ComponentMeta} from '@storybook/react';
import {action} from "@storybook/addon-actions";
import {Task} from "./Task";

export default {
    title: 'TODOLIST/Task',
    component: Task,
    args: {
        removeTask: action("delete task"),
        changeTaskStatus: action("Change status"),
        changeTaskTitle: action("Change title"),
        todolistId: "df",
    }
} as ComponentMeta<typeof Task>;

const Template: ComponentStory<typeof Task> = (args) => <Task {...args} />;

export const TaskIsDoneStory = Template.bind({});
TaskIsDoneStory.args = {
    task: {id: "1", title: "JS", isDone: true},
}

export const TaskDoNotDoneStory = Template.bind({});
TaskDoNotDoneStory.args = {
    task: {id: "1", title: "JS", isDone: false},
}
