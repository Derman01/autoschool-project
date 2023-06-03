import { FC, useCallback, MouseEvent } from 'react';
import { ComponentOptions } from 'shared/types';
import { Button as UIButton } from 'shared/ui/buttons';
import { Actions } from './Interface';
import { OpenMenu } from './Menu';
import { IItemData } from 'shared/lib/source';

interface ButtonOptions extends ComponentOptions {
    source: Actions;
    item: IItemData;
}

export const Button: FC<ButtonOptions> = (options) => {
    const { source, item, className } = options;

    const onClick = useCallback(
        (e: MouseEvent) => {
            e.stopPropagation();
            OpenMenu({
                source,
                item,
            });
        },
        [source, item]
    );

    return (
        <UIButton
            className={className}
            icon={'action'}
            viewMode={'icon'}
            iconSize={'m'}
            onClick={onClick}
        />
    );
};
