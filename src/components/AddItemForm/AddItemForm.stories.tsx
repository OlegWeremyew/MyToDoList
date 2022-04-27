import React from 'react';

import { action } from '@storybook/addon-actions';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { AddItemForm } from './AddItemForm';

export default {
  title: 'TODOLIST/AddItemForm',
  component: AddItemForm,
  argTypes: {
    addItem: {
      description: 'Callback clicked inside form',
    },
    label: {
      description: 'Start text inside input',
    },
  },
} as ComponentMeta<typeof AddItemForm>;

// eslint-disable-next-line react/jsx-props-no-spreading
const Template: ComponentStory<typeof AddItemForm> = args => <AddItemForm {...args} />;

export const AddItemFormStory = Template.bind({});
AddItemFormStory.args = {
  addItem: action('AddItemForm'),
  label: 'Start input text',
};
