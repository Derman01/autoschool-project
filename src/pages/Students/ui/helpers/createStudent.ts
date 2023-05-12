import { TDataForm, OpenForm } from 'shared/ui/form';
import { Server } from 'shared/lib/source';
import { GroupModel } from '../../models/GroupModel';
import InstructorModel from '../../models/InstructorModel';

export const createStudent = (afterCreate: () => void) => {
    const data: TDataForm = [
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
                source: new Server({
                    endpoint: 'groups',
                    model: GroupModel,
                }),
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
            type: 'text',
            options: {
                placeholder: 'Оплата',
            },
        },
    ];

    const onResult = (data: object) => {
        return new Server({
            endpoint: 'students',
        })
            .call('create', {
                ...data,
                gearbox_type: 'manual',
                photo_path: 'pic.txt',
            })
            .then(() => afterCreate());
    };

    OpenForm(
        {
            width: 430,
            headerTitle: 'Добавить студента',
        },
        {
            data,
            onResult,
        }
    );
};
