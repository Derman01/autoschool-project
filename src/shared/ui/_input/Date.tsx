import { FC } from 'react';
import './styles/Date.scss';
import { ComponentOptions } from 'shared/types';
import { Field } from './Field';

interface DateOptions extends ComponentOptions {
    placeholder?: string;
    onChange?: (value: string) => void;
}

export const Date: FC<DateOptions> = (options) => {
    const { className, placeholder, onChange } = options;

    return (
        <Field
            onChange={onChange}
            type={'date'}
            placeholder={placeholder}
            className={className}
            min={'2023-01-01'}
        />
    );
};
