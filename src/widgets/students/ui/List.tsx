import { FC, useRef } from 'react';
import './styles/List.scss';
import { ComponentOptions } from 'shared/types';
import { IViewRef, RichView } from 'shared/ui/list';
import { STUDENT_SOURCE } from './Constants';
import { createStudent, deleteStudent, editStudent } from './helper';
import { StudentModel } from '../models/Model';
import { Label } from 'shared/ui/input';
import { Actions } from 'widgets/action';

export interface IFilter {
    group?: string;
}

export interface ListOptions extends ComponentOptions {
    filter?: IFilter;
}

const TemplateItem: FC = (item: StudentModel) => {
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
                return editStudent(item, ref.current.reload);
            },
        },
        {
            id: 'delete',
            title: 'Удалить',
            handler: (item) => {
                return deleteStudent(item).then(ref.current.reload);
            },
        },
    ];

    return (
        <RichView
            ref={ref}
            className={className}
            headerTitle={'Курсы'}
            addingCallback={() => createStudent(ref.current.reload)}
            listOptions={{
                actions,
                filter,
                source: STUDENT_SOURCE,
                templateItem: TemplateItem,
            }}
        />
    );
};
