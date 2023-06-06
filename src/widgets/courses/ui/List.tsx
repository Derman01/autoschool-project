import { FC, useRef } from 'react';
import './styles/List.scss';
import { ComponentOptions } from 'shared/types';
import { Caption, IViewRef, RichGrid } from 'shared/ui/list';
import { COURSES_SOURCE } from './Constants';
import { createCourse } from './helper';
import { CoursesModel } from '../models/Model';
import { PopupOpener } from 'shared/ui/popup';
import { Card } from './Card';

export interface IFilter {
    group?: string;
}

export interface ListOptions extends ComponentOptions {
    filter?: IFilter;
}

const CAPTIONS: Caption[] = [
    {
        title: 'Название',
        width: '4fr',
    },
    {
        title: 'Категория',
        width: '1fr',
    },
    {
        title: (
            <>
                Ак. часов
                <br />
                (практика/лекции)
            </>
        ),
        width: '1fr',
    },
    {
        title: 'Стоимость',
        width: '1fr',
    },
];

export const List: FC<ListOptions> = (options) => {
    const { className, filter } = options;

    const ref = useRef<IViewRef>();

    const openCard = (course: CoursesModel) => {
        PopupOpener.createModal({
            templateOptions: {
                headerTitle: 'Карточка курса',
                bodyContent: (
                    <Card course={course} afterUpdate={ref.current.reload} />
                ),
            },
        });
    };

    return (
        <RichGrid
            ref={ref}
            className={className}
            headerTitle={'Курсы'}
            addingCallback={() => createCourse(ref.current.reload)}
            gridOptions={{
                captions: CAPTIONS,
                columns: [
                    (item: CoursesModel) => <>{item.title}</>,
                    (item: CoursesModel) => <>{item.Category}</>,
                    (item: CoursesModel) => (
                        <>
                            {item.DrivingHours}/{item.LessonHours}
                        </>
                    ),
                    (item: CoursesModel) => <>{item.Price}</>,
                ],
                selectedChanged: openCard,
                filter,
                source: COURSES_SOURCE,
            }}
        />
    );
};
