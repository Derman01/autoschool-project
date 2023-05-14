import { TDataForm } from 'shared/ui/_form/Menu';
import { Server } from 'shared/lib/_source/Server';
import { GROUP_SOURCE } from 'widgets/groups';
import InstructorModel from '../../models/InstructorModel';
import { Memory } from 'shared/lib/source';

export const STUDENT_SOURCE = new Server({
    endpoint: 'students',
});

export const StudentDataForm: TDataForm = [
    {
        id: 'surname',
        type: 'text',
        options: {
            placeholder: 'Фамилия',
        },
    },
    {
        id: 'name',
        type: 'text',
        options: {
            placeholder: 'Имя',
        },
    },
    {
        id: 'patronymic',
        type: 'text',
        options: {
            placeholder: 'Отчество',
        },
    },
    {
        id: 'birthday',
        type: 'date',
        options: {
            placeholder: 'Дата рождения',
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
        id: 'group_id',
        type: 'menu',
        options: {
            placeholder: 'Группа',
            source: GROUP_SOURCE,
        },
    },
    {
        id: 'instructor_id',
        type: 'menu',
        options: {
            placeholder: 'Преподаватель по практике',
            source: new Server({
                endpoint: 'instructors',
                model: InstructorModel,
            }),
        },
    },
    {
        id: 'payment_needed',
        type: 'number',
        options: {
            placeholder: 'Оплата',
        },
    },
    {
        id: 'gearbox_type',
        type: 'menu',
        options: {
            placeholder: 'Коробка передач',
            source: new Memory({
                data: [
                    {
                        id: 'auto',
                        title: 'Автомат',
                    },
                    {
                        id: 'manual',
                        title: 'Механика',
                    },
                ],
            }),
        },
    },
];
