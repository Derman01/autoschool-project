import { IData, IItemData } from './IData';
import axios, { AxiosResponse } from 'axios';

interface Model {
    new (value?: any): Object;
}

interface Response {
    success: boolean;
    message: string;
    items: IItemData[];
}

interface IMethods {
    query: string;
}

interface IServerData {
    endpoint: string;
    binding?: IMethods;
    model?: Model;
}

const API_URL = 'https://autoschool.evgfilim1.me/api/';

export class Server implements IData {
    $endpoint: string;
    $binding: IMethods | undefined;
    $model: Model;

    query(params?: object): Promise<IItemData[]> {
        return this.call(this.$binding?.query, params);
    }

    public call(method?: string, params?: object): Promise<IItemData[]> {
        const pathList = [this.$endpoint];
        if (method) {
            pathList.push(method);
        }

        const path = pathList.join('/');

        return axios
            .get(API_URL + path, {
                params,
            })
            .then((data: AxiosResponse<Response>) => {
                if (data.data.items?.length) {
                    return data.data.items.map((item) => {
                        return new this.$model(item) as IItemData;
                    });
                } else {
                    return data.data.items;
                }
            });
    }

    constructor(data: IServerData) {
        this.$binding = data.binding;
        this.$endpoint = data.endpoint;
        this.$model = data.model || Object;
    }
}
