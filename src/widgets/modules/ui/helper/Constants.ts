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
            conditionSuccess: (value) => !!value,
        },
    },
    {
        id: 'hours',
        type: 'number',
        options: {
            placeholder: 'Академические часы',
            required: true,
            conditionSuccess: (value) => !!value,
        },
    },
    {
        id: 'description',
        type: 'textArea',
        options: { placeholder: 'Описание' },
    },
];
