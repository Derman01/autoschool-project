import { FC, useRef } from 'react';
import './styles/List.scss';
import { IViewRef, RichView } from 'shared/ui/list';
import { Actions } from 'widgets/action';
import { GROUP_SOURCE } from './helper/Constants';
import { createGroup } from './helper/createGroup';
import { editGroup } from './helper/editGroup';
import { deleteGroup } from './helper/deleteGroup';
import { downloadFile } from "shared/lib/source";

interface IListGroupProps {
    dataLoadCallback?: (items: any[]) => void;
    selectedChanged?: (item: any) => void;
}

export const ListGroup: FC<IListGroupProps> = (props) => {
    const { dataLoadCallback, selectedChanged } = props;
    const listRef = useRef<IViewRef>();

    const actions: Actions = [
        {
            id: 'edit',
            title: 'Редактировать',
            handler: (item) => {
                return editGroup(item, listRef.current.reload);
            },
        },
        {
            id: 'delete',
            title: 'Удалить',
            handler: (item) => {
                return deleteGroup({
                    id: item['id'],
                }).then(() => {
                    return listRef.current.reload();
                });
            },
        },
        {
            id: 'print',
            title: 'Распечатать документ',
            children: [
                {
                    id: 'print-1',
                    title: 'Экзаменационный протокол',
                    handler: (item) => {
                      downloadFile('registration-order', {
                        group_id: item.id
                      });
                      return Promise.resolve();
                    }
                },
                {
                    id: 'print-2',
                    title: 'Справка о результатах экзамена ГИБДД',
                },
                {
                    id: 'print-3',
                    title: 'Заявление в ГИБДД на получение государственной услуги экзамен - получение прав',
                },

                {
                    id: 'print-4',
                    title: 'Расписание занятий',
                },
            ],
        },
    ];

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
                actions,
                autoSelected: true,
                style: 'master',
                dataLoadCallback,
                selectedChanged,
                keyProperty: 'id',
                templateItem: ({
                    name,
                    count,
                }: {
                    name: string;
                    count: number;
                }) => (
                    <div className={'widget-group__List__item'}>
                        <div>{name}</div>
                        <div className={'widget-group__List__item_count'}>
                            {count}
                        </div>
                    </div>
                ),
            }}
        />
    );
};
