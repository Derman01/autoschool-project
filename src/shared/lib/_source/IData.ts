export interface IItemData {
    id: string;
    [key: string]: any;
}

export interface IData {
    query(params?: object): Promise<IItemData[] | IItemData | void>;
}
