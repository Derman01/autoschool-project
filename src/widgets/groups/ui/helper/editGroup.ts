import { GROUP_SOURCE, GroupDataForm } from './Constants';
import { editData } from 'shared/lib/action';
import { GroupModel } from '../../models/Model';

export const editGroup = (
    data: object,
    afterCreate?: (item: GroupModel) => Promise<void>
) => {
    return editData(
        {
            data,
            source: GROUP_SOURCE,
            modelDataForm: GroupDataForm,
        },
        afterCreate
    );
};
