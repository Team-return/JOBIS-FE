import { themes } from '@jobis/design-token';
import { Text as _Text } from '@jobis/ui';
import { Meta } from '@storybook/react';

export default {
    title: 'Components/Text',
    component: _Text,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        color: {
            control: 'color',
        },
        fontSize: {
            options: Object.keys(themes.font),
            control: 'select',
        },
        fontWeight: {
            options: Object.keys(themes.fontWeight),
            control: 'select',
        },
    },
} as Meta<typeof _Text>;

export const TextStory = {
    args: { as: 'p', children: 'hello', fontSize: 'h1' },
};
