import { FC, ReactElement } from 'react';
import './styles/Label.scss';
import { ComponentOptions } from 'shared/types';

interface LabelOptions extends ComponentOptions {
    title: string;
    text: string | ReactElement;
}

export const Label: FC<LabelOptions> = (options) => {
    const { text, title } = options;

    return (
        <>
            <span className={'Label__title'}>{title}</span> : {text}
        </>
    );
};
