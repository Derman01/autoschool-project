import { Server } from 'shared/lib/source';
import { TDataForm } from 'shared/ui/_form/Menu';

export const MODULE_SOURCE = new Server({
    endpoint: 'modules',
});

export const MODULE_DATA_FORM: TDataForm = [
    {
        id: 'name',
        type: 'text',
        options: {
            placeholder: 'Название',
        },
    },
    {
        id: 'description',
        type: 'text',
        options: { placeholder: 'Описание' },
    },
];
