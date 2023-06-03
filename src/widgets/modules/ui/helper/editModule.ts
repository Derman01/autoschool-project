import { MODULE_SOURCE, ModuleDataForm } from './Constants';
import { editData } from 'shared/lib/action';
import { ModuleModel } from '../../models/Model';

export const editModule = (
    data: object,
    afterCreate?: (module?: ModuleModel) => Promise<void>
) => {
    return editData(
        {
            data,
            source: MODULE_SOURCE,
            modelDataForm: ModuleDataForm,
        },
        afterCreate
    );
};
