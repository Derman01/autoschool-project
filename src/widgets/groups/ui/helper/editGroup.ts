import { GROUP_SOURCE, GroupDataForm } from './Constants';
import { editData } from 'shared/lib/action';

export const editGroup = (data: object, afterCreate?: () => void) => {
    return editData(
        {
            data,
            source: GROUP_SOURCE,
            modelDataForm: GroupDataForm,
        },
        afterCreate
    );
};
