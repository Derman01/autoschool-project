import { FC, MouseEvent, useCallback, useRef } from 'react';
import './styles/List.scss';
import { IViewRef, RichView } from 'shared/ui/list';
import { GROUP_SOURCE } from './helper/Constants';
import { createGroup } from './helper/createGroup';
import { Button } from 'shared/ui/buttons';
import { GroupModel } from '../models/Model';
import { PopupOpener } from 'shared/ui/popup';
import { Card } from './Card';

interface IListGroupProps {
    dataLoadCallback?: (items: any[]) => void;
    selectedChanged?: (item: any) => void;
}

export const ListGroup: FC<IListGroupProps> = (props) => {
    const { dataLoadCallback, selectedChanged } = props;
    const listRef = useRef<IViewRef>();

    const openCard = useCallback((e: MouseEvent, group: GroupModel) => {
        e.stopPropagation();
        PopupOpener.createModal({
            templateOptions: {
                headerTitle: 'Карточка группы',
                width: 600,
                bodyContent: (
                    <Card group={group} afterUpdate={listRef.current.reload} />
                ),
            },
        });
    }, []);

    return (
        <RichView
            contrastBackground={false}
            className={'widget-group__List'}
            ref={listRef}
            headerTitle={'Группы'}
            addingCallback={() => createGroup(listRef.current.reload)}
            listOptions={{
                source: GROUP_SOURCE,
                className: 'widget-group__List_list',
                minWidth: 300,
                canSelected: true,
                autoSelected: true,
                style: 'master',
                dataLoadCallback,
                selectedChanged,
                keyProperty: 'id',
                templateItem: (item: GroupModel) => (
                    <div className={'widget-group__List__item'}>
                        <div>{item.name}</div>
                        <Button
                            onClick={(e) => openCard(e, item)}
                            viewMode={'icon'}
                            icon={'info'}
                            iconSize={'m'}
                        />
                    </div>
                ),
            }}
        />
    );
};
