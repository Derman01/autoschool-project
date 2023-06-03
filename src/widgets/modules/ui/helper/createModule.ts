import { MODULE_SOURCE, ModuleDataForm } from './Constants';
import { createData } from 'shared/lib/action';

export const createModule = (afterCreate: () => Promise<void>) => {
    return createData(
        {
            headerTitle: 'Добавить модуль',
            source: MODULE_SOURCE,
            modelDataForm: ModuleDataForm,
        },
        afterCreate
    );
};
