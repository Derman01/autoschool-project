import { CarDataForm, CAR_SOURCE } from './Constants';
import { CarModel } from '../../models/CarModel';
import { editData } from 'shared/lib/_actions/edit';

export const editCar = (
    data: object,
    afterCreate?: (car: CarModel) => Promise<void>
) => {
    return editData(
        {
            data,
            source: CAR_SOURCE,
            modelDataForm: CarDataForm,
            width: 600,
            convertDataTo: (data: CarModel) => ({
                ...data,
                name: data.Name,
            }),
        },
        afterCreate
    );
};
