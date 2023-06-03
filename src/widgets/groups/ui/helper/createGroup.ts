import { GROUP_SOURCE, GroupDataForm } from './Constants';
import { createData } from 'shared/lib/action';

export const createGroup = (afterCreate: () => Promise<void>) => {
    return createData(
        {
            headerTitle: 'Добавить группу',
            source: GROUP_SOURCE,
            modelDataForm: GroupDataForm,
        },
        afterCreate
    );
};
