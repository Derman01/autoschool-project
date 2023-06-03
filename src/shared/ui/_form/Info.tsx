import { FC, ReactElement } from 'react';
import './styles/Info.scss';
import { ComponentOptions } from 'shared/types';
import { classNames } from 'shared/lib/helpers';

interface TData {
    title: string;
    value: string | ReactElement;
}

interface InfoOptions extends ComponentOptions {
    data: TData[];
}

export const Info: FC<InfoOptions> = (options) => {
    const { className, data } = options;

    return (
        <div className={classNames(['Info', className])}>
            {data.map((row) => (
                <>
                    <div className={'Info__title'}>{row.title}:</div>
                    <div className={'Info__value'}>{row.value}</div>
                </>
            ))}
        </div>
    );
};
