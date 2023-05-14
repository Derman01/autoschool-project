import { Server } from 'shared/lib/source';
import { TDataForm } from 'shared/ui/_form/Menu';
import { ModuleModel } from 'pages/Modules/model/Model';

export const MODULE_SOURCE = new Server({
    endpoint: 'modules',
    model: ModuleModel,
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
