import { TDataForm } from 'shared/ui/_form/Menu';
import { Server } from 'shared/lib/_source/Server';
import { ExamsModel } from '../../models/Model';
import { Memory } from 'shared/lib/source';

export const EXAM_SOURCE = new Server({
    endpoint: 'exams',
    model: ExamsModel,
});

export const ExamDataForm: TDataForm = [
    {
        id: 'name',
        type: 'text',
        options: {
            placeholder: 'Название',
        },
    },
    {
        id: 'mark',
        type: 'menu',
        options: {
            placeholder: 'Оценка',
            source: new Memory({
                data: [
                    {
                        id: '2',
                        title: '2',
                    },
                    {
                        id: '3',
                        title: '3',
                    },
                    {
                        id: '4',
                        title: '4',
                    },
                    {
                        id: '5',
                        title: '5',
                    },
                ],
            }),
        },
    },
    {
        id: 'date',
        type: 'date',
        options: {
            placeholder: 'Дата проведения',
        },
    },
];
