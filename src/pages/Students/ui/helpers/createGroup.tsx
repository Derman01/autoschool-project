import { TDataForm, OpenForm } from 'shared/ui/form';
import { Server } from 'shared/lib/source';
import { CategoryModel } from '../../models/CategoryModel';
import InstructorModel from 'pages/Students/models/InstructorModel';

export const createGroup = (afterCreate: () => void) => {
    const data: TDataForm = [
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
                placeholder: 'Категория',
                source: new Server({
                    endpoint: 'courses',
                    model: CategoryModel,
                }),
            },
        },
    ];

    const onResult = (data: object) => {
        return new Server({
            endpoint: 'groups',
        })
            .call('create', {
                ...data,
            })
            .then(() => afterCreate());
    };

    OpenForm(
        {
            width: 430,
            headerTitle: 'Добавить группу',
        },
        {
            data,
            onResult,
        }
    );
};
