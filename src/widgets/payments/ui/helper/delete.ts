import { deleteData } from 'shared/lib/action';
import { PAYMENTS_SOURCE } from '../Constants';

export const deletePayment = (params: object) =>
    deleteData(PAYMENTS_SOURCE, params);
