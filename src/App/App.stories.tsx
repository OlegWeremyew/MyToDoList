import React from 'react';

import { ComponentStory, ComponentMeta } from '@storybook/react';

import { ReduxStoreProviderDecorator } from '../stories/ReduxStoreProviderDecorator';

import { App } from './App';

export default {
  title: 'TODOLIST/App',
  component: App,
  argTypes: {},
  decorators: [ReduxStoreProviderDecorator],
} as ComponentMeta<typeof App>;

const Template: ComponentStory<typeof App> = () => <App demo />;

export const AppStory = Template.bind({});
AppStory.args = {};
