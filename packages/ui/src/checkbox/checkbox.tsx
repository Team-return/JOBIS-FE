import * as React from 'react';
import { CheckboxProps } from './types';
import {
    CheckboxBackgroundStyle,
    CheckboxBackgroundStyleDetail,
    CheckboxStyle,
    CursorStyle,
    LabelStyle,
} from './style.css';
import { clsx } from 'clsx';
import { Text } from '../texts';
import { themes } from '@jobis/design-token';
import { Icon } from '../icon';

export const Checkbox = React.forwardRef(
    (props: CheckboxProps, ref: React.Ref<HTMLInputElement>) => {
        const { children, disabled, checked, ...checkboxProps } = props;

        return (
            <label className={clsx([LabelStyle, CursorStyle({ cursor: disabled })])}>
                <div
                    className={clsx([
                        CheckboxBackgroundStyle,
                        !disabled && CheckboxBackgroundStyleDetail,
                    ])}>
                    <input
                        className={clsx([CheckboxStyle])}
                        type="checkbox"
                        checked={checked}
                        disabled={disabled}
                        ref={ref}
                        {...checkboxProps}
                    />
                    {checked && <Icon icon="Check" size={12} color={themes.color.grayScale[10]} />}
                </div>
                <Text
                    as="span"
                    fontSize="body1"
                    color={disabled ? themes.color.grayScale[50] : themes.color.grayScale[90]}
                    style={{ cursor: disabled ? 'not-allowed' : 'pointer' }}>
                    {children}
                </Text>
            </label>
        );
    },
);
