import {FC} from 'react';
import './styles/Icon.scss';
import {ComponentOptions} from 'shared/types';
import {classNames} from 'shared/lib/helpers';

interface IconOptions extends ComponentOptions {
    icon: string;
}

export const Icon: FC<IconOptions> = (options) => {
    const {className} = options;

    return (
        <div className={classNames(['Icon', className], {}, [options.icon])}/>
    );
};
