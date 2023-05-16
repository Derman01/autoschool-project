import { editData } from 'shared/lib/action';
import { COURSES_DATA_FORM, COURSES_SOURCE } from '../Constants';

export const editCourse = (data: object, afterCreate?: () => void) => {
    return editData(
        {
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
