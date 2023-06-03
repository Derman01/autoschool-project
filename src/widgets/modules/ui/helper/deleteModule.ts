import { deleteData } from 'shared/lib/action';
import { MODULE_SOURCE } from './Constants';

interface IParams {
    id: string;
}

export const deleteModule = ({ id }: IParams) => {
    return deleteData(MODULE_SOURCE, {
        id,
    });
};
