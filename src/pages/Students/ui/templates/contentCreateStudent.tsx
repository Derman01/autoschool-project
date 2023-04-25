import { FC } from 'react';
import '../styles/contentCreateStudent.scss';
import { ComponentOptions } from 'shared/types';
import { classNames } from 'shared/lib/helpers';
import { Menu, TDataForm } from 'shared/ui/form';

interface ContentCreateStudentOptions extends ComponentOptions {}

export const ContentCreateStudent: FC<ContentCreateStudentOptions> = (
    options
) => {
    const { className } = options;
    const data: TDataForm = [
        {
            id: 'Surname',
            type: 'text',
            options: {
                placeholder: 'Фамилия',
            },
        },
        {
            id: 'Name',
            type: 'text',
            options: {
                placeholder: 'Имя',
            },
        },
        {
            id: 'SecondName',
            type: 'text',
            options: {
                placeholder: 'Отчество',
            },
        },
        {
            id: 'phone',
            type: 'text',
            options: {
                placeholder: 'Телефон',
            },
        },
        {
            id: 'address',
            type: 'text',
            options: {
                placeholder: 'Адрес',
            },
        },
        {
            id: 'category',
            type: 'text',
            options: {
                placeholder: 'Группа',
            },
        },
        {
            id: 'payment',
            type: 'text',
            options: {
                placeholder: 'Оплата',
            },
        },
    ];

    return (
        <div className={classNames(['contentCreateStudent', className])}>
            <Menu data={data} />
        </div>
    );
};
