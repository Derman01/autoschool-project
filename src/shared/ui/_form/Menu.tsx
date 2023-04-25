import { FC } from 'react';
import './styles/Menu.scss';
import { ComponentOptions } from 'shared/types';
import { classNames } from 'shared/lib/helpers';
import { WidgetParse } from './Constants';

interface IDataObjectForm {
    id: string;
    type: 'text';
    options: object;
}

export type TDataForm = IDataObjectForm[];

interface MenuOptions extends ComponentOptions {
    data: TDataForm;
}

export const Menu: FC<MenuOptions> = (options) => {
    const { className, data } = options;

    return (
        <div className={classNames(['form-Menu', className])}>
            {data.map((object) => {
                const Widget = WidgetParse[object.type];
                return <Widget key={object.id} {...object.options} />;
            })}
        </div>
    );
};
