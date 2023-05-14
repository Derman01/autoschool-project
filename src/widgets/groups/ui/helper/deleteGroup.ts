import { deleteData } from 'shared/lib/action';
import { GROUP_SOURCE } from './Constants';

interface IParams {
    id: string;
}

export const deleteGroup = ({ id }: IParams) => {
    return deleteData(GROUP_SOURCE, {
        id,
    });
};
