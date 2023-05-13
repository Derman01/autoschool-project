import { FC } from 'react';
import './styles/Menu.scss';
import { ComponentOptions } from 'shared/types';
import { classNames } from 'shared/lib/helpers';
import { Action, Actions } from './Interface';
import { View } from 'shared/ui/list';
import { IItemData, Memory } from 'shared/lib/source';
import { closePopup, PopupOpener } from 'shared/ui/popup';

interface MenuOptions extends ComponentOptions {
    source: Actions;
    item: IItemData;
    popupConfig: { id: string };
}

export const Menu: FC<MenuOptions> = (options) => {
    const { className, source, item, popupConfig } = options;
    const listSource = new Memory({
        data: source,
    });

    const onClickHandler = (action: Action) => {
        if (action.children) {
            OpenMenu({
                source: action.children,
                item,
            });
        } else {
            action.handler &&
                action.handler(item).then(() => {
                    closePopup(popupConfig.id);
                });
        }
    };

    return (
        <div className={classNames(['widget-action__Menu', className])}>
            <View
                selectedChanged={onClickHandler}
                source={listSource}
                canSelected={false}
                horizontalPaddings={'2xs'}
                autoSelected={false}
                style={'list'}
                templateItem={(item: Action) => <>{item.title}</>}
            />
        </div>
    );
};

export const OpenMenu = (config: Omit<MenuOptions, 'popupConfig'>) => {
    const popupConfig = { id: '' };

    popupConfig.id = PopupOpener.createModal({
        templateOptions: {
            width: 400,
            headerTitle: 'Выберите действие',
            bodyContent: <Menu {...config} popupConfig={popupConfig} />,
        },
    }).id;
};
