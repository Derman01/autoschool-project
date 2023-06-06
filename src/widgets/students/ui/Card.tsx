import { FC, useCallback, useState } from 'react';
import './styles/Card.scss';
import { ComponentOptions } from 'shared/types';
import { classNames } from 'shared/lib/helpers';
import { StudentModel } from '../models/Model';
import { Button } from 'shared/ui/buttons';
import { Info } from 'shared/ui/form';
import { usePopupContext } from 'shared/hooks/usePopupContext';
import { deleteStudent } from './helper/delete';
import { editStudent } from './helper/edit';

interface CardOptions extends ComponentOptions {
    student: StudentModel;
    afterUpdate: () => Promise<void>;
}

export const Card: FC<CardOptions> = (options) => {
    const { className, afterUpdate } = options;
    const [studentModel, setStudentModel] = useState(options.student);
    const { closePopup } = usePopupContext();

    const onEditHandler = useCallback(() => {
        editStudent(studentModel, (item: StudentModel) => {
            setStudentModel(
                (module) =>
                    new StudentModel({
                        ...module,
                        ...item,
                    })
            );
            return afterUpdate();
        });
    }, [studentModel]);

    const onDeleteHandler = useCallback(() => {
        deleteStudent(studentModel).then(() => {
            afterUpdate().then(() => {
                closePopup();
            });
        });
    }, [studentModel]);

    return (
        <div className={classNames(['widget-module__Card', className])}>
            <Info
                data={[
                    {
                        title: 'ФИО',
                        value: studentModel.getFullName,
                    },
                    {
                        title: 'Дата рождения',
                        value: studentModel.Birthday,
                    },
                    {
                        title: 'Номер телефона',
                        value: studentModel.phone,
                    },
                    {
                        title: 'Адресс',
                        value: studentModel.address,
                    },
                    {
                        title: 'Инструктор',
                        value: studentModel.Instructor,
                    },
                    studentModel.NeedPayment && {
                        title: 'Долг',
                        value: studentModel.NeedPayment,
                    },
                    studentModel.NeedPayment && {
                        title: 'Дата следующего платежа',
                        value: studentModel.nextPayment,
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
