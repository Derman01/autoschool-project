import { Server } from 'shared/lib/source';

interface IParams {
    id: string;
}

export const deleteCar = ({ id }: IParams) => {
    return new Server({
        endpoint: 'cars',
    }).call('delete', { id });
};
