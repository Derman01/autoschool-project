import { FC } from 'react';
import '../styles/contentCreateStudent.scss';
import { ComponentOptions } from 'shared/types';
import { classNames } from 'shared/lib/helpers';
import { Menu, TDataForm } from 'shared/ui/form';

interface ContentCreateStudentOptions extends ComponentOptions {}

export const ContentCreateGroup: FC<ContentCreateStudentOptions> = (
    options
) => {
    const { className } = options;
    const data: TDataForm = [
        {
            id: 'name',
            type: 'text',
            options: {
                placeholder: 'Название',
            },
        },
        {
            id: 'period',
            type: 'text',
            options: {
                placeholder: 'Период обучения',
            },
        },
        {
            id: 'prepod',
            type: 'text',
            options: {
                placeholder: 'Преподаватель теории',
            },
        },
        {
            id: 'date',
            type: 'text',
            options: {
                placeholder: 'Дата внутренного экзамена',
            },
        },
    ];

    return (
        <div className={classNames(['contentCreateStudent', className])}>
            <Menu data={data} />
        </div>
    );
};
