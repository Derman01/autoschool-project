import { createData } from 'shared/lib/action';
import { STUDENT_SOURCE, getData } from '../Constants';
import { GroupModel } from 'widgets/groups';

export const createStudent = (
    group: GroupModel,
    afterCreate: () => Promise<void>
) =>
    createData(
        {
            headerTitle: 'Добавить студента',
            source: STUDENT_SOURCE,
            modelDataForm: getData(group),
        },
        afterCreate
    );
