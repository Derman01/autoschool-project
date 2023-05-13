import { Server } from 'shared/lib/source';

interface IParams {
    id: string;
}

export const deleteGroup = ({ id }: IParams) => {
    return new Server({
        endpoint: 'groups',
    }).call('delete', {
        id,
    });
};
