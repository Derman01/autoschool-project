import { TDataForm } from 'shared/ui/_form/Menu';
import { Server } from 'shared/lib/_source/Server';
import InstructorModel from 'pages/Students/models/InstructorModel';
import { GroupModel } from '../../models/Model';
import { COURSES_SOURCE } from 'widgets/courses';

export const GROUP_SOURCE = new Server({
    endpoint: 'groups',
    model: GroupModel,
});

export const GroupDataForm: TDataForm = [
    {
        id: 'name',
        type: 'text',
        options: {
            placeholder: 'Название',
        },
    },
    {
        id: 'studying_start_date',
        type: 'date',
        options: {
            placeholder: 'Дата начала обучения',
        },
    },
    {
        id: 'studying_end_date',
        type: 'date',
        options: {
            placeholder: 'Дата окончания обучения',
        },
    },
    {
        id: 'instructor_id',
        type: 'menu',
        options: {
            placeholder: 'Преподаватель теории',
            source: new Server({
                endpoint: 'instructors',
                model: InstructorModel,
            }),
        },
    },
    {
        id: 'examen_date',
        type: 'date',
        options: {
            placeholder: 'Дата внутренного экзамена',
        },
    },
    {
        id: 'course_id',
        type: 'menu',
        options: {
            placeholder: 'Курс',
            source: COURSES_SOURCE,
        },
    },
];
