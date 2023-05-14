import { deleteData } from 'shared/lib/action';
import { STUDENT_SOURCE } from './Constants';

interface IParams {
    groupId: string;
    studentId: string;
}

export const deleteStudent = ({ studentId, groupId }: IParams) => {
    return deleteData(STUDENT_SOURCE, {
        group_id: groupId,
        id: studentId,
    });
};
