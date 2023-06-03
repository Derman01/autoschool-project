import { IData, IItemData } from './IData';
import axios, { AxiosResponse } from 'axios';
import { Model as ClassModel } from './Model';

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
    delete: string;
    edit: string;
    create: string;
}

interface IServerData {
    endpoint: string;
    binding?: IMethods;
    model?: Model;
}

const API_URL = 'https://autoschool.evgfilim1.me/api/';

export const downloadFile = (
    nameDoc: string,
    params: { [key: string | number]: any }
) => {
    const stringParams = Object.keys(params)
        .map((key) => {
            return `${key}=${params[key]}`;
        })
        .join('&');

    window.open(API_URL + 'documents/' + nameDoc + '/create?' + stringParams);
};

export class Server implements IData {
    $endpoint: string;
    $binding: IMethods | undefined;
    $model: Model;

    query(params?: object): Promise<IItemData[] | void> {
        return this.call(this.$binding?.query, params);
    }

    delete(params?: object): Promise<IItemData[] | void> {
        return this.call(this.$binding?.delete, params);
    }

    edit(params?: object): Promise<IItemData[] | void> {
        return this.call(this.$binding?.edit, params);
    }

    create(params?: object): Promise<IItemData[] | void> {
        return this.call(this.$binding?.create, params);
    }

    public call(method?: string, params?: object): Promise<IItemData[] | void> {
        const pathList = [this.$endpoint];
        if (method) {
            pathList.push(method);
        }

        const path = pathList.join('/');

        return (
            axios
                .get(API_URL + path, {
                    params,
                })
                // @ts-ignore
                .then((data: AxiosResponse<Response>) => {
                    if (data.data.success) {
                        if (data.data.items?.length) {
                            return data.data.items.map((item) => {
                                return new this.$model(item) as IItemData;
                            });
                        } else {
                            return data.data.items;
                        }
                    } else {
                        alert(data.data.message);
                        return Promise.reject();
                    }
                })
        );
    }

    constructor(data: IServerData) {
        const {
            endpoint,
            binding = {
                query: '',
                edit: 'update',
                delete: 'delete',
                create: 'create',
            },
            model = ClassModel,
        } = data;

        this.$binding = binding;
        this.$endpoint = endpoint;
        this.$model = model;
    }
}
