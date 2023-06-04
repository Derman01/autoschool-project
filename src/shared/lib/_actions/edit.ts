import { OpenForm } from 'shared/ui/form';
import { getDataWithValue, IParams } from './helper';
import { IItemData } from 'shared/lib/_source/IData';

export const editData = (
    params?: IParams,
    afterCreate?: (data?: object) => Promise<void>
) => {
    const data = params.convertDataTo
        ? params.convertDataTo(params.data)
        : params.data;

    const onResult = (newData: object) => {
        const newObject = {
            ...data,
            ...(params.convertDataFrom
                ? params.convertDataFrom(newData)
                : newData),
        };
        return params.source
            .edit(newObject)
            .then((payload) => {
                if (afterCreate)
                    return afterCreate(payload as IItemData).then(() => {
                        return true;
                    });
                else return true;
            })
            .catch(() => {
                return false;
            });
    };

    OpenForm(
        {
            width: 500 || params.width,
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
