import { Server } from 'shared/lib/source';

interface IParams {
    groupId: string;
    studentId: string;
}

export const deleteStudent = ({ studentId, groupId }: IParams) => {
    return new Server({
        endpoint: 'students',
    }).call('delete', {
        group_id: groupId,
        id: studentId,
    });
};
