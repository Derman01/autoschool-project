import { editData } from 'shared/lib/action';
import { PAYMENTS_DATA_FORM, PAYMENTS_SOURCE } from '../Constants';

export const editPayment = (
    data: object,
    afterCreate?: () => Promise<void>
) => {
    return editData(
        {
            modelDataForm: PAYMENTS_DATA_FORM,
            source: PAYMENTS_SOURCE,
            data,
        },
        afterCreate
    );
};
