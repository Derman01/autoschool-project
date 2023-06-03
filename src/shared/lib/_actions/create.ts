import { OpenForm } from 'shared/ui/form';
import { IParams } from './helper';

export const createData = (
    params: IParams,
    afterCreate?: () => Promise<void>
) => {
    const onResult = (data: object) => {
        return params.source
            .create({
                ...params.data,
                ...(params.convertDataFrom
                    ? params.convertDataFrom(data)
                    : data),
            })
            .then(() => {
                return afterCreate().then(() => true);
            })
            .catch(() => false);
    };

    OpenForm(
        {
            width: 430,
            headerTitle: params.headerTitle,
        },
        {
            data: params.modelDataForm,
            onResult,
        }
    );
};
