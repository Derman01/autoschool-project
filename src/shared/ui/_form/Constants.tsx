import { FC } from 'react';
import { Text, Date, Menu } from 'shared/ui/input';

export type TWidget = 'text' | 'date' | 'menu';

export const WidgetParse: Record<
    TWidget,
    FC<{ onChange: (value: any) => void }>
> = {
    text: Text,
    date: Date,
    menu: Menu,
};
