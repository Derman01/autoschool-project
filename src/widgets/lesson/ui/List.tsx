import { FC, useRef } from 'react';
import './styles/List.scss';
import { ComponentOptions } from 'shared/types';
import { IViewRef, RichView } from 'shared/ui/list';
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

const TemplateItem: FC = (item: LessonModel) => {
    let [date, timeStart] = item.time_start.split(' ');
    let [_, timeEnd] = item.time_end.split(' ');
    timeStart = timeStart.split(':').slice(0, 2).join(':');
    timeEnd = timeEnd.split(':').slice(0, 2).join(':');

    return (
        <div className={'widget-lesson__item'}>
            <div className="widget-lesson__item_moduleName">
                <Label title={'Название'} text={item.module_name} />
            </div>
            <div className="widget-lesson__item_groupName">
                <Label title={'Группа'} text={item.group_name} />
            </div>
            <div className="widget-lesson__item_date">
                <Label title={'Дата'} text={date} />
            </div>
            <div className="widget-lesson__item_times">
                <Label title={'Время'} text={`${timeStart} - ${timeEnd}`} />
            </div>
        </div>
    );
};

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
        <RichView
            ref={ref}
            className={className}
            headerTitle={'Расписание уроков'}
            addingCallback={() => createLesson(ref.current.reload)}
            listOptions={{
                actions,
                filter,
                source: LESSON_SOURCE,
                templateItem: TemplateItem,
            }}
        />
    );
};
