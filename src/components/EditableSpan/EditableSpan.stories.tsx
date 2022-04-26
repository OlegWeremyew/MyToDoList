import React from 'react';

import { action } from '@storybook/addon-actions';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { EditableSpan } from './EditableSpan';

export default {
  title: 'TODOLIST/EditableSpan',
  component: EditableSpan,
} as ComponentMeta<typeof EditableSpan>;

// eslint-disable-next-line react/jsx-props-no-spreading
const Template: ComponentStory<typeof EditableSpan> = args => <EditableSpan {...args} />;

export const EditableSpanStory = Template.bind({});

EditableSpanStory.args = {
  value: 'value',
  onChange: action('change title'),
};
