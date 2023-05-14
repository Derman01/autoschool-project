import { OpenForm } from 'shared/ui/form';
import { IParams } from './helper';

export const createData = (params: IParams, afterCreate?: () => void) => {
    const onResult = (data: object) => {
        return params.source
            .create({
                ...params.data,
                ...data,
            })
            .then(() => afterCreate());
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
