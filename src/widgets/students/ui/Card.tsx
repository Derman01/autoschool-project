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
import { downloadFile, IItemData, Memory, Server } from 'shared/lib/source';
import { View } from 'shared/ui/list';
import { PopupOpener } from 'shared/ui/popup';

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

    const onPaymentAll = () => {
        new Server({
            endpoint: 'payments',
        })
            .create({
                student_id: studentModel.id,
                date: new Date(),
                value: studentModel.NeedPayment,
            })
            .then(() => {
                afterUpdate();
                setStudentModel(
                    new StudentModel({
                        ...studentModel,
                        updatePayment: true,
                    })
                );
            });
    };

    const sourcePrint = new Memory({
        data: [
            {
                id: 'car-driving-registration-card',
                name: 'Карточка учета вождения автомобиля',
            },
            {
                id: 'driver-exam-card',
                name: 'Экзаменационная карточка водителя',
            },
            {
                id: 'service-delivery-act',
                name: 'Акт на оказание услуг',
            },
            {
                id: 'service-performance-act',
                name: 'Акт о выполнении услуги',
            },
            {
                id: 'waybill',
                name: 'Путевой лист',
            },
            {
                id: 'driver-license-application',
                name: 'Заявление в ГИБДД на получение прав',
            },
        ],
    });

    const printDocument = (item: IItemData) => {
        downloadFile(item.id, {
            student_id: studentModel.id,
        });
    };

    const openPanelDoc = () => {
        PopupOpener.createModal({
            templateOptions: {
                width: 500,
                headerTitle: 'Печать документов',
                bodyContent: (
                    <View
                        source={sourcePrint}
                        selectedChanged={printDocument}
                        canHover={true}
                        canSelected={false}
                    />
                ),
            },
        });
    };

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
                {studentModel.NeedPayment && (
                    <Button
                        style={'primary'}
                        title={'Оплачено'}
                        onClick={onPaymentAll}
                    />
                )}
                <Button
                    style={'unaccented'}
                    title={'Печать документов'}
                    onClick={openPanelDoc}
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
