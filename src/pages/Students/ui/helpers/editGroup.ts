import { OpenForm } from 'shared/ui/form';
import { Server } from 'shared/lib/source';
import { getGroupDataWithValue } from './Constants';

export const editGroup = (data: object, afterCreate?: () => void) => {
    const onResult = (newData: object) => {
        return new Server({
            endpoint: 'groups',
        })
            .call('update', {
                ...data,
                ...newData,
            })
            .then(() => afterCreate && afterCreate());
    };

    OpenForm(
        {
            width: 430,
            headerTitle: 'Редактировать группу',
        },
        {
            data: getGroupDataWithValue(data),
            onResult,
            buttonActionText: 'Редактировать',
        }
    );
};
