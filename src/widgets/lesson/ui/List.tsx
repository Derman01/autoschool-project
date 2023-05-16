import { FC, useRef } from 'react';
import './styles/List.scss';
import { ComponentOptions } from 'shared/types';
import { IViewRef, RichGrid, RichView } from 'shared/ui/list';
import { LESSON_SOURCE } from './Constants';
import { createLesson, deleteLesson, editLesson } from './helper';
import { LessonModel } from '../models/Model';
import { Label } from 'shared/ui/input';
import { Actions } from 'widgets/action';

export interface IFilter {
    group?: string;
}

export interface ListOptions extends ComponentOptions {
    filter?: IFilter;
}

export const List: FC<ListOptions> = (options) => {
    const { className, filter } = options;

    const ref = useRef<IViewRef>();

    const actions: Actions = [
        {
            id: 'edit',
            title: 'Редактировать',
            handler: (item) => {
                return editLesson(item, ref.current.reload);
            },
        },
        {
            id: 'delete',
            title: 'Удалить',
            handler: (item) => {
                return deleteLesson(item).then(ref.current.reload);
            },
        },
    ];

    return (
        <RichGrid
            ref={ref}
            className={className}
            headerTitle={'Расписание уроков'}
            addingCallback={() => createLesson(ref.current.reload)}
            gridOptions={{
                actions,
                filter,
                canSelected: false,
                source: LESSON_SOURCE,
                captions: [
                    {
                        title: 'Название',
                        width: '3fr',
                    },
                    {
                        title: 'Группа',
                        width: '1fr',
                    },
                    {
                        title: 'Дата',
                        width: '1fr',
                    },
                    {
                        title: 'Время',
                        width: '1fr',
                    },
                ],
                columns: [
                    (item: LessonModel) => <>{item.module_name}</>,
                    (item: LessonModel) => <>{item.group_name}</>,
                    (item: LessonModel) => <>{item.date}</>,
                    (item: LessonModel) => <>{item.time}</>,
                ],
            }}
        />
    );
};
