import { Server } from 'shared/lib/source';
import { CoursesModel } from '../models/Model';
import { TDataForm } from 'shared/ui/form';
import { MODULE_SOURCE } from 'widgets/modules';
import { CATEGORY_SOURCE } from 'widgets/category';
import { TEACHER_SOURCE } from 'widgets/teacher';

export const COURSES_SOURCE = new Server({
    endpoint: 'courses',
    model: CoursesModel,
});

export const COURSES_DATA_FORM: TDataForm = [
    {
        id: 'name',
        type: 'text',
        options: {
            placeholder: 'Название',
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
        id: 'instructor_id',
        type: 'menu',
        options: {
            placeholder: 'Лектор',
            source: TEACHER_SOURCE,
            required: true,
            filter: { is_practician: false },
        },
        dependence: {
            id: 'category_id',
            convertFilter: (value) => ({
                category_id: value,
            }),
        },
    },
    {
        id: 'price',
        type: 'text',
        options: {
            placeholder: 'Стоимость',
            required: true,
            patterns: [/[1-9]/, /\d/, /\d/, /\d/, /\d/],
        },
    },
    {
        id: 'modules',
        type: 'checkbox',
        options: {
            placeholder: 'Модули',
            source: MODULE_SOURCE,
            required: true,
            conditionSuccess: (value) => !!value?.length,
        },
    },
    {
        id: 'driving_hours',
        type: 'text',
        options: {
            placeholder: 'Кол. часов практики',
            required: true,
            patterns: [/[1-9]/, /\d/],
        },
    },
];
