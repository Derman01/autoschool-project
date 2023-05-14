import { FC } from 'react';
import './styles/Text.scss';
import { ComponentOptions } from 'shared/types';
import { Field } from './Field';

interface AreaOptions extends ComponentOptions {
    placeholder?: string;
    onChange?: (value: string) => void;
    value?: any;
}

export const Area: FC<AreaOptions> = (options) => {
    const { className, placeholder, onChange, value } = options;

    return (
        <Field
            onChange={onChange}
            type={'textArea'}
            value={value}
            className={className}
            placeholder={placeholder}
        />
    );
};
