import { IItemData } from 'shared/lib/source';

export interface Action<T = object> {
    id: string;
    title: string;
    children?: Actions;
    handler?: (item: IItemData) => Promise<any>;
}

export type Actions<T = object> = Action<T>[];
