import { Memory, Server } from 'shared/lib/source';
import { StudentModel } from '../models/Model';
import { TDataForm } from 'shared/ui/form';
import { GROUP_SOURCE } from 'widgets/groups';
import InstructorModel from 'pages/Students/models/InstructorModel';

export const STUDENT_SOURCE = new Server({
    endpoint: 'students',
    model: StudentModel,
});

export const STUDENTS_DATA_FORM: TDataForm = [
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
