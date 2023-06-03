import { TDataForm } from 'shared/ui/form';
import { Server } from 'shared/lib/source';
import { ModuleModel } from '../../models/Model';

export const MODULE_SOURCE = new Server({
    endpoint: 'modules',
    model: ModuleModel,
});

export const ModuleDataForm: TDataForm = [
    {
        id: 'name',
        type: 'text',
        options: {
            placeholder: 'Название',
            required: true,
        },
    },
    {
        id: 'hours',
        type: 'text',
        options: {
            placeholder: 'Академические часы',
            required: true,
            patterns: [/[1-9]/, /\d/],
        },
    },
    {
        id: 'description',
        type: 'textArea',
        options: { placeholder: 'Описание' },
    },
];
