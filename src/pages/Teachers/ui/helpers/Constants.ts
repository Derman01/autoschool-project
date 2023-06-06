import { TDataForm } from 'shared/ui/_form/Menu';
import { Memory, Server } from 'shared/lib/source';
import { CAR_SOURCE } from 'widgets/car';
import { CATEGORY_SOURCE } from 'widgets/category';

export const TEACHER_SOURCE = new Server({
    endpoint: 'instructors',
});

export const TeacherDataForm: TDataForm = [
    {
        id: 'surname',
        type: 'text',
        options: {
            placeholder: 'Фамилия',
            required: true,
        },
    },
    {
        id: 'name',
        type: 'text',
        options: {
            placeholder: 'Имя',
            required: true,
        },
    },
    {
        id: 'patronymic',
        type: 'text',
        options: {
            placeholder: 'Отчество',
            required: true,
        },
    },
    {
        id: 'is_practician',
        type: 'menu',
        options: {
            placeholder: 'Должность',
            required: true,
            conditionSuccess: (value) => value !== undefined,
            source: new Memory({
                data: [
                    {
                        id: '0',
                        title: 'Лектор',
                    },
                    {
                        id: '1',
                        title: 'Инструктор по практике',
                    },
                ],
                keyProperty: 'id',
            }),
        },
    },
    {
        id: 'education',
        type: 'menu',
        options: {
            placeholder: 'Образование',
            required: true,
            source: new Memory({
                data: [
                    {
                        id: 'Среднее общее',
                        title: 'Среднее общее',
                    },
                    {
                        id: 'Cреднее профессиональное',
                        title: 'Cреднее профессиональное',
                    },
                    {
                        id: 'Высшее',
                        title: 'Высшее',
                    },
                ],
                keyProperty: 'id',
            }),
        },
    },
    {
        id: 'certificate',
        type: 'text',
        options: {
            placeholder: 'Удостоверение',
            required: true,
        },
    },
    {
        id: 'category_id',
        type: 'menu',
        options: {
            placeholder: 'Категория',
            source: CATEGORY_SOURCE,
            required: true,
        },
    },
    {
        id: 'driver_certificate',
        type: 'text',
        options: {
            placeholder: 'Водительское удостоверение',
            required: true,
        },
    },
    {
        id: 'car_id',
        type: 'menu',
        options: {
            placeholder: 'Авто',
            source: CAR_SOURCE,
            filter: {
                free: true,
            },
        },
        dependence: {
            id: 'is_practician',
            conditionRequired: (value) => value === 1,
            filterIds: ['is_practician', 'category_id'],
            convertFilter: ([is_practician, category_id]) => ({
                is_practician,
                category_id,
            }),
        },
    },
    {
        id: 'phone',
        type: 'text',
        options: {
            placeholder: 'Телефон',
            required: true,
            conditionSuccess: (value) => new RegExp(/\d{11}/).test(value),
            patterns: [
                /\d/,
                /\d/, //1
                /\d/, //2
                /\d/, //3
                /\d/, //4
                /\d/, //5
                /\d/, //6
                /\d/, //7
                /\d/, //8
                /\d/, //9
                /\d/, //10
            ],
        },
    },
];
