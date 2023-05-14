import { FC } from 'react';
import { Text, Date, Menu, Time, Number, Area } from 'shared/ui/input';

export type TWidget = 'text' | 'date' | 'menu' | 'time' | 'number' | 'textArea';

export const WidgetParse: Record<
    TWidget,
    FC<{ onChange: (value: any) => void }>
> = {
    text: Text,
    date: Date,
    menu: Menu,
    time: Time,
    number: Number,
    textArea: Area,
};
