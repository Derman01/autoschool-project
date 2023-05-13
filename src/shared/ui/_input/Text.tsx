import { FC } from 'react';
import './styles/Text.scss';
import { ComponentOptions } from 'shared/types';
import { Field } from './Field';

interface TextOptions extends ComponentOptions {
    placeholder?: string;
    onChange?: (value: string) => void;
    value?: any;
}

export const Text: FC<TextOptions> = (options) => {
    const { className, placeholder, onChange, value } = options;

    return (
        <Field
            onChange={onChange}
            type={'text'}
            value={value}
            className={className}
            placeholder={placeholder}
        />
    );
};
