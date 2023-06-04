import { FC } from 'react';
import {
    Text,
    Date,
    Menu,
    Time,
    Number,
    Area,
    Checkbox,
} from 'shared/ui/input';
import { AnyObject } from 'shared/lib/source';

export type TWidget =
    | 'text'
    | 'date'
    | 'menu'
    | 'time'
    | 'number'
    | 'textArea'
    | 'checkbox';

export const WidgetParse: Record<
    TWidget,
    FC<{ onChange: (value: any) => void; filter: AnyObject }>
> = {
    text: Text,
    date: Date,
    menu: Menu,
    time: Time,
    number: Number,
    textArea: Area,
    checkbox: Checkbox,
};
