import { MODULE_SOURCE, ModuleDataForm } from './Constants';
import { editData } from 'shared/lib/action';

export const editModule = (data: object, afterCreate?: () => Promise<void>) => {
    return editData(
        {
            data,
            source: MODULE_SOURCE,
            modelDataForm: ModuleDataForm,
        },
        afterCreate
    );
};
