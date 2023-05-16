import { deleteData } from 'shared/lib/action';
import { EXAM_SOURCE } from './Constants';

interface IParams {
    id: string;
}

export const deleteExam = ({ id }: IParams) => {
    return deleteData(EXAM_SOURCE, {
        id,
    });
};
