import { IItemData, Memory, Server } from 'shared/lib/source';
import { StudentModel } from '../models/Model';
import { TDataForm } from 'shared/ui/form';
import { GROUP_SOURCE, GroupModel } from 'widgets/groups';
import InstructorModel from 'pages/Students/models/InstructorModel';
import { CoursesModel } from 'widgets/courses';

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
        id: 'birthday',
        type: 'date',
        options: {
            placeholder: 'Дата рождения',
            required: true,
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
    {
        id: 'address',
        type: 'text',
        options: {
            placeholder: 'Адрес',
            required: true,
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
];

export const getData = (groupModel: GroupModel): TDataForm => {
    const price = Number(groupModel.course_price);

    const paymentsData: IItemData[] = [
        {
            id: price / 2 + '',
            title: 'Частичная - ' + price / 2,
        },
        {
            id: price + '',
            title: 'Полная - ' + price,
        },
    ];

    return [
        ...STUDENTS_DATA_FORM,
        {
            id: 'payment_value',
            type: 'menu',
            options: {
                placeholder: 'Оплата',
                required: true,
                source: new Memory({
                    data: paymentsData,
                }),
            },
        },
        {
            id: 'group_id',
            type: 'text',
            options: {
                placeholder: 'Оплата',
                required: true,
                value: groupModel.id,
            },
            dependence: {
                id: 'null',
            },
        },
        {
            id: 'photo_path',
            type: 'text',
            options: {
                placeholder: 'Оплата',
                required: true,
                value: 'pic.txt',
            },
            dependence: {
                id: 'null',
            },
        },
    ];
};
