import { FC, useCallback, useState } from 'react';
import { ComponentOptions } from 'shared/types';
import { classNames } from 'shared/lib/helpers';
import { default as TeacherModel } from '../models/TeacherModel';
import { Button } from 'shared/ui/buttons';
import { Info } from 'shared/ui/form';
import { usePopupContext } from 'shared/hooks/usePopupContext';
import { deleteTeacher } from './helpers/deleteTeacher';
import { editTeacher } from './helpers/editTeacher';

interface CardOptions extends ComponentOptions {
    teacher: TeacherModel;
    afterUpdate: () => Promise<void>;
}

export const Card: FC<CardOptions> = (options) => {
    const { className, afterUpdate } = options;
    const [teacherModel, setTeacherModel] = useState(options.teacher);
    const { closePopup } = usePopupContext();

    const onEditHandler = useCallback(() => {
        editTeacher(teacherModel, (item: TeacherModel) => {
            setTeacherModel(
                (module) =>
                    new TeacherModel({
                        ...module,
                        ...item,
                    })
            );
            return afterUpdate();
        });
    }, [teacherModel]);

    const onDeleteHandler = useCallback(() => {
        deleteTeacher(teacherModel).then(() => {
            afterUpdate().then(() => {
                closePopup();
            });
        });
    }, [teacherModel]);

    return (
        <div className={classNames(['widget-module__Card', className])}>
            <Info
                data={[
                    {
                        title: 'ФИО',
                        value: teacherModel.FullName,
                    },
                    {
                        title: 'Должность',
                        value: teacherModel.job,
                    },
                    {
                        title: 'Образование',
                        value: teacherModel.education,
                    },
                    {
                        title: 'Удостоверение',
                        value: teacherModel.certificate,
                    },
                    {
                        title: 'Видительское удостоверение',
                        value: teacherModel.driver_certificate,
                    },
                    {
                        title: 'Категория',
                        value: teacherModel.category_name,
                    },
                    teacherModel.car_id && {
                        title: 'Транспорт',
                        value:
                            teacherModel.car_name +
                            ' - ' +
                            teacherModel.car_reg_number,
                    },
                    {
                        title: 'Номер телефона',
                        value: teacherModel.PhoneNumber,
                    },
                ]}
            />
            <div className="widget-module__Card_actions">
                <Button
                    style={'primary'}
                    title={'Редактировать'}
                    onClick={onEditHandler}
                />
                <Button
                    style={'danger'}
                    title={'Удалить'}
                    onClick={onDeleteHandler}
                />
            </div>
        </div>
    );
};
