import { FC } from 'react';
import './styles/Date.scss';
import { ComponentOptions } from 'shared/types';
import { Field } from './Field';

interface NumberOptions extends ComponentOptions {
    placeholder?: string;
    onChange?: (value: string) => void;
    value?: any;
    patterns?: string[];
}

export const Number: FC<NumberOptions> = (options) => {
    const { className, placeholder, onChange, value, patterns } = options;

    return (
        <Field
            value={value}
            onChange={onChange}
            type={'number'}
            placeholder={placeholder}
            className={className}
            patterns={patterns}
            min={0}
        />
    );
};
