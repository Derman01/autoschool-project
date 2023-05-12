import { forwardRef, useImperativeHandle, useState } from 'react';
import './styles/Menu.scss';
import { ComponentOptions } from 'shared/types';
import { classNames } from 'shared/lib/helpers';
import { WidgetParse, TWidget } from './Constants';

interface IDataObjectForm {
    id: string;
    type: TWidget;
    options: object;
}

export type TDataForm = IDataObjectForm[];
export interface MenuRef {
    getData: () => object;
}

interface MenuOptions extends ComponentOptions {
    data: TDataForm;
}

export const Menu = forwardRef<MenuRef, MenuOptions>((options, ref) => {
    const { className, data } = options;
    const [result, setResult] = useState({});

    const getData = () => result;

    useImperativeHandle(ref, () => ({
        getData,
    }));

    const onChange = (id: string, value: any) => {
        setResult((result) => ({
            ...result,
            [id]: value,
        }));
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
