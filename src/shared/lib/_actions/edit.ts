import { OpenForm } from 'shared/ui/form';
import { getDataWithValue, IParams } from './helper';

export const editData = (params?: IParams, afterCreate?: () => void) => {
    const onResult = (newData: object) => {
        return params.source
            .edit({
                ...params.data,
                ...(params.convertDataFrom
                    ? params.convertDataFrom(newData)
                    : newData),
            })
            .then(() => afterCreate && afterCreate());
    };

    const data = params.convertDataTo
        ? params.convertDataTo(params.data)
        : params.data;

    OpenForm(
        {
            width: 430,
            headerTitle: 'Редактирование',
        },
        {
            data: getDataWithValue(params.modelDataForm, data),
            onResult,
            buttonActionText: 'Редактировать',
        }
    );
    return Promise.resolve();
};
