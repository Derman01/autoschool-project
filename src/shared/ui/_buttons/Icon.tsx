import { FC } from 'react';
import './styles/Icon.scss';
import { ComponentOptions } from 'shared/types';
import { classNames } from 'shared/lib/helpers';
import { IconName } from './Interface';

interface IconOptions extends ComponentOptions {
    icon: IconName;
    size?: 'm' | 's'
}

export const Icon: FC<IconOptions> = (options) => {
    const {
        className,
        size = 'm'
    } = options;

    return (
        <div className={classNames(['Icon', className], {
            size
        }, [options.icon])}/>
    );
};
