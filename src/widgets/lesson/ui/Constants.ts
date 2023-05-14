import { Server } from 'shared/lib/source';
import { LessonModel } from '../models/Model';
import { TDataForm } from 'shared/ui/form';
import { MODULE_SOURCE } from 'pages/Modules';
import InstructorModel from 'pages/Students/models/InstructorModel';
import { GROUP_SOURCE } from 'widgets/groups';

export const LESSON_SOURCE = new Server({
    endpoint: 'lessons',
    model: LessonModel,
});

export const LESSON_DATA_FORM: TDataForm = [
    {
        id: 'module_id',
        type: 'menu',
        options: {
            placeholder: 'Модуль',
            source: MODULE_SOURCE,
        },
    },
    {
        id: 'instructor_id',
        type: 'menu',
        options: {
            placeholder: 'Преподаватель',
            source: new Server({
                endpoint: 'instructors',
                model: InstructorModel,
            }),
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
        id: 'date',
        type: 'date',
        options: {
            placeholder: 'Дата',
        },
    },
    {
        id: 'time-start',
        type: 'time',
        options: {
            placeholder: 'Время начала занятия',
        },
    },
    {
        id: 'time-end',
        type: 'time',
        options: {
            placeholder: 'Время окончания занятия',
        },
    },
];
