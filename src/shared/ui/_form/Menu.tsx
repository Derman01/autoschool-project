import { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import './styles/Menu.scss';
import { ComponentOptions } from 'shared/types';
import { classNames } from 'shared/lib/helpers';
import { WidgetParse, TWidget } from './Constants';
import { AnyObject } from 'shared/lib/source';

interface IDataObjectOptions extends AnyObject {
    placeholder: string;
    required?: boolean;
    conditionSuccess?: (value: any) => boolean;
}

interface IDataObjectForm {
    id: string;
    type: TWidget;
    options: IDataObjectOptions;
}

export type TDataForm = IDataObjectForm[];
export interface MenuRef {
    getData: () => object;
}

interface MenuOptions extends ComponentOptions {
    data: TDataForm;
    onDataInput: (isSuccess: boolean) => void;
}

export const Menu = forwardRef<MenuRef, MenuOptions>((options, ref) => {
    const { className, data, onDataInput } = options;
    const [result, setResult] = useState({});
    const [dataSuccess, setDataSuccess] = useState(
        (() => {
            const res: AnyObject = {};
            data.forEach((value) => {
                if (value.options.required) {
                    res[value.id] = false;
                }
            });
            return res;
        })()
    );

    const getData = () => result;

    useImperativeHandle(ref, () => ({
        getData,
    }));

    useEffect(() => {
        const isSuccess =
            Object.entries(dataSuccess).find(([_, isSuccess]) => !isSuccess) ===
            undefined;
        onDataInput(isSuccess);
    }, [dataSuccess]);

    const updateDataSuccess = (id: string, value: any) => {
        const field = data.find((value) => value.id === id);
        if (field.options.required) {
            setDataSuccess((data) => ({
                ...data,
                [id]: field.options.conditionSuccess
                    ? field.options.conditionSuccess(value)
                    : !!value,
            }));
        }
    };

    const onChange = (id: string, value: any) => {
        setResult((result) => ({
            ...result,
            [id]: value,
        }));
        updateDataSuccess(id, value);
    };

    return (
        <div className={classNames(['form-Menu', className])}>
            {data.map((object) => {
                const Widget = WidgetParse[object.type];
                return (
                    <Widget
                        onChange={(value) => onChange(object.id, value)}
                        key={object.id}
                        {...object.options}
                    />
                );
            })}
        </div>
    );
});
