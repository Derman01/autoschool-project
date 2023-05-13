import { FC, useCallback } from 'react';
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
    const { source, item } = options;

    const onClick = useCallback(() => {
        OpenMenu({
            source,
            item,
        });
    }, [source, item]);

    return (
        <UIButton
            icon={'action'}
            viewMode={'icon'}
            iconSize={'m'}
            onClick={onClick}
        />
    );
};
