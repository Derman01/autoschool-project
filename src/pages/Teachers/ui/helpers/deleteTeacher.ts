import { deleteData } from 'shared/lib/action';
import { TEACHER_SOURCE } from './Constants';

interface IParams {
    id: string;
}

export const deleteTeacher = ({ id }: IParams) => {
    return deleteData(TEACHER_SOURCE, {
        id,
    });
};
