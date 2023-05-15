import { IItemData } from './IData';

export interface AnyObject {
    [key: string | number]: any;
}

export class Model implements IItemData {
    id: string;
    [key: string | number]: any;

    constructor(data: { [key: string | number]: any }) {
        Object.keys(data).forEach((key: string | number) => {
            if (!Object.getOwnPropertyDescriptors(this.__proto__)[key]) {
                this[key] = data[key];
            }
        });
    }
}
