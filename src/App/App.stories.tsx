import React from 'react';
import {ComponentMeta, ComponentStory} from '@storybook/react';
import {App} from "./App";
import StoryRouter from 'storybook-react-router'
import {ReduxStoreProviderDecorator} from "../stories/ReduxStoreProviderDecorator";

export default {
    title: 'TODOLIST/App',
    component: App,
    argTypes: {},
    decorators: [ReduxStoreProviderDecorator, StoryRouter()],
} as ComponentMeta<typeof App>

const Template: ComponentStory<typeof App> = (args) => <App demo={true}/>

export const AppStory = Template.bind({})
AppStory.args = {}
