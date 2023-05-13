import { Server } from 'shared/lib/source';

interface IParams {
    id: string;
}

export const deleteTeacher = ({ id }: IParams) => {
    return new Server({
        endpoint: 'instructors',
    }).call('delete', { id });
};
