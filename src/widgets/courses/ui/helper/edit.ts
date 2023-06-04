import { editData } from 'shared/lib/action';
import { COURSES_DATA_FORM, COURSES_SOURCE } from '../Constants';
import { CoursesModel } from '../../models/Model';

export const editCourse = (
    data: object,
    afterCreate?: (item: CoursesModel) => Promise<void>
) => {
    return editData(
        {
            width: 600,
            modelDataForm: COURSES_DATA_FORM,
            source: COURSES_SOURCE,
            convertDataTo: (data) => {
                return {
                    ...data,
                    modules: data.modules.map(
                        (module: { id: string }) => module.id
                    ),
                };
            },
            data,
        },
        afterCreate
    );
};
