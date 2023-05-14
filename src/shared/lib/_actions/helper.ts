import { TDataForm } from 'shared/ui/form';
import { Server } from 'shared/lib/_source/Server';

export interface AnyObject {
    [key: string | number]: any;
}

export interface IParams {
    source: Server;
    modelDataForm: TDataForm;
    data?: object;
    headerTitle?: string;
}

export const getDataWithValue = (defaultData: TDataForm, data: AnyObject) => {
    return defaultData.map((value) => {
        if (data[value.id]) {
            return {
                ...value,
                options: {
                    ...value.options,
                    value: data[value.id],
                },
            };
        } else return value;
    });
};
