import { OpenForm } from 'shared/ui/form';
import { getDataWithValue, IParams } from './helper';

export const editData = (
    params?: IParams,
    afterCreate?: () => Promise<void>
) => {
    const onResult = (newData: object) => {
        return params.source
            .edit({
                ...params.data,
                ...(params.convertDataFrom
                    ? params.convertDataFrom(newData)
                    : newData),
            })
            .then(() => {
                if (afterCreate)
                    return afterCreate().then(() => {
                        return true;
                    });
                else return true;
            })
            .catch(() => {
                return false;
            });
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
