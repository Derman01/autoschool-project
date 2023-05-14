import { FC } from 'react';
import './styles/Date.scss';
import { ComponentOptions } from 'shared/types';
import { Field } from './Field';

interface TimeOptions extends ComponentOptions {
    placeholder?: string;
    onChange?: (value: string) => void;
    value?: any;
}

export const Time: FC<TimeOptions> = (options) => {
    const { className, placeholder, onChange, value } = options;

    return (
        <Field
            value={value}
            onChange={onChange}
            type={'time'}
            placeholder={placeholder}
            className={className}
            min={'2023-01-01'}
        />
    );
};
