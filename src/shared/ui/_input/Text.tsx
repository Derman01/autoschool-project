import { FC } from 'react';
import './styles/Text.scss';
import { ComponentOptions } from 'shared/types';
import { Field } from './Field';

interface TextOptions extends ComponentOptions {
    placeholder?: string;
    onChange?: (value: string) => void;
}

export const Text: FC<TextOptions> = (options) => {
    const { className, placeholder, onChange } = options;

    return (
        <Field
            onChange={onChange}
            type={'text'}
            className={className}
            placeholder={placeholder}
        />
    );
};
