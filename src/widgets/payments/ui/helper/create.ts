import { createData } from 'shared/lib/action';
import { PAYMENTS_DATA_FORM, PAYMENTS_SOURCE } from '../Constants';

export const createPayment = (afterCreate: () => void) =>
    createData(
        {
            headerTitle: 'Добавить платеж',
            source: PAYMENTS_SOURCE,
            modelDataForm: PAYMENTS_DATA_FORM,
        },
        afterCreate
    );
