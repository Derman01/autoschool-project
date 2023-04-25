import { FC } from 'react';
import { Text } from 'shared/ui/input';

export type TWidget = 'text';

export const WidgetParse: Record<TWidget, FC> = {
    text: Text,
};
