import { Memory, Server } from 'shared/lib/source';
import { CoursesModel } from '../models/Model';
import { TDataForm } from 'shared/ui/form';
import { MODULE_SOURCE } from 'widgets/modules';

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
        },
    },
    {
        id: 'category',
        type: 'menu',
        options: {
            placeholder: 'Категория',
            source: new Memory({
                data: [
                    {
                        id: 'A',
                        title: 'A',
                    },
                    {
                        id: 'B',
                        title: 'B',
                    },
                    {
                        id: 'C',
                        title: 'C',
                    },
                    {
                        id: 'D',
                        title: 'D',
                    },
                ],
                keyProperty: 'id',
            }),
        },
    },
    {
        id: 'price',
        type: 'number',
        options: {
            placeholder: 'Стоимость',
        },
    },
    {
        id: 'modules',
        type: 'checkbox',
        options: {
            placeholder: 'Модули',
            source: MODULE_SOURCE,
        },
    },
];
