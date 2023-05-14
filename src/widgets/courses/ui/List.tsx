import { FC, useRef } from 'react';
import './styles/List.scss';
import { ComponentOptions } from 'shared/types';
import { IViewRef, RichGrid } from 'shared/ui/list';
import { COURSES_SOURCE } from './Constants';
import { createCourse, deleteCourse, editCourse } from './helper';
import { CoursesModel } from '../models/Model';
import { Label } from 'shared/ui/input';
import { Actions } from 'widgets/action';

export interface IFilter {
    group?: string;
}

export interface ListOptions extends ComponentOptions {
    filter?: IFilter;
}

const TemplateItem: FC = (item: CoursesModel) => {
    return (
        <div>
            <div>
                <Label title={'Название'} text={item.name} />
            </div>
            <div>
                <Label title={'Категория'} text={item.category} />
            </div>
            <div>
                <Label title={'Стоимость'} text={item.price} />
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
                return editCourse(item, ref.current.reload);
            },
        },
        {
            id: 'delete',
            title: 'Удалить',
            handler: (item) => {
                return deleteCourse(item).then(ref.current.reload);
            },
        },
    ];

    return (
        <RichGrid
            ref={ref}
            className={className}
            headerTitle={'Курсы'}
            addingCallback={() => createCourse(ref.current.reload)}
            gridOptions={{
                captions: [
                    {
                        title: 'Название',
                        width: '1fr',
                    },
                    {
                        title: 'Категория',
                        width: '200px',
                    },
                    {
                        title: 'Стоимость',
                        width: '200px',
                    },
                ],
                columns: [
                    (item: CoursesModel) => <>{item.name}</>,
                    (item: CoursesModel) => <>{item.category}</>,
                    (item: CoursesModel) => <>{item.price}</>,
                ],
                actions,
                filter,
                source: COURSES_SOURCE,
                templateItem: TemplateItem,
            }}
        />
    );
};
