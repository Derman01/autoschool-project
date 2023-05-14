import { Server } from 'shared/lib/source';
import { PaymentModel } from '../models/Model';
import { TDataForm } from 'shared/ui/form';

export const PAYMENTS_SOURCE = new Server({
    endpoint: 'payments',
    model: PaymentModel,
});

export const PAYMENTS_DATA_FORM: TDataForm = [
    {
        id: 'value',
        type: 'number',
        options: {
            placeholder: 'Платеж',
        },
    },
    {
        id: 'date',
        type: 'date',
        options: {
            placeholder: 'Дата',
            value: Date.now(),
        },
    },
];
