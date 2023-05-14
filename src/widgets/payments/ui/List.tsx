import { FC, useRef } from 'react';
import './styles/List.scss';
import { ComponentOptions } from 'shared/types';
import { IViewRef, RichGrid } from 'shared/ui/list';
import { PAYMENTS_SOURCE } from './Constants';
import { createPayment, deletePayment, editPayment } from './helper';
import { PaymentModel } from '../models/Model';
import { Actions } from 'widgets/action';

export interface IFilter {
    student_id: string;
}

export interface ListOptions extends ComponentOptions {
    filter: IFilter;
}

export const List: FC<ListOptions> = (options) => {
    const { className, filter } = options;

    const ref = useRef<IViewRef>();

    const actions: Actions = [
        {
            id: 'edit',
            title: 'Редактировать',
            handler: (item) => {
                return editPayment(item, ref.current.reload);
            },
        },
        {
            id: 'delete',
            title: 'Удалить',
            handler: (item) => {
                return deletePayment(item).then(ref.current.reload);
            },
        },
    ];

    return (
        <RichGrid
            ref={ref}
            className={className}
            headerTitle={'Платежи'}
            addingCallback={() => createPayment(ref.current.reload)}
            gridOptions={{
                captions: [
                    {
                        title: 'Дата',
                        width: '1fr',
                    },
                    {
                        title: 'Платеж',
                        width: '200px',
                    },
                ],
                columns: [
                    (item: PaymentModel) => <>{item.date}</>,
                    (item: PaymentModel) => <>{item.value}</>,
                ],
                actions,
                filter,
                source: PAYMENTS_SOURCE,
            }}
        />
    );
};
