import { IData, IItemData } from './IData';

export interface IMemoryData {
    data: IItemData[];
    keyProperty?: string;
}

export default class Memory implements IData {
    private readonly _data: IMemoryData;

    query(params?: object): Promise<IItemData[]> {
        return new Promise((resolve) => {
            resolve(this._data.data);
        });
    }

    constructor(data: IMemoryData) {
        this._data = data;
    }
}
