import { OpenForm } from 'shared/ui/form';
import { getDataWithValue, IParams } from './helper';

export const editData = (params?: IParams, afterCreate?: () => void) => {
    const onResult = (newData: object) => {
        return params.source
            .edit({
                ...params.data,
                ...newData,
            })
            .then(() => afterCreate && afterCreate());
    };

    OpenForm(
        {
            width: 430,
            headerTitle: 'Редактирование',
        },
        {
            data: getDataWithValue(params.modelDataForm, params.data),
            onResult,
            buttonActionText: 'Редактировать',
        }
    );
    return Promise.resolve();
};
