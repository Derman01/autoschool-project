import { FC } from 'react';
import './styles/Page.scss';
import { ComponentOptions } from 'shared/types';
import { classNames } from 'shared/lib/helpers';
import { View } from 'shared/ui/list';
import { Server } from 'shared/lib/source';
import TeacherModel from '../models/TeacherModel';
import { Button } from 'shared/ui/buttons';
import { PopupOpener } from 'shared/ui/popup';
import { Menu, TDataForm } from 'shared/ui/form';

interface PageOptions extends ComponentOptions {}

const Page: FC<PageOptions> = (options) => {
    const { className } = options;
    const source = new Server({
        endpoint: 'instructors',
        model: TeacherModel,
    });

    const data: TDataForm = [
        {
            id: 'Surname',
            type: 'text',
            options: {
                placeholder: 'Фамилия',
            },
        },
        {
            id: 'Name',
            type: 'text',
            options: {
                placeholder: 'Имя',
            },
        },
        {
            id: 'SecondName',
            type: 'text',
            options: {
                placeholder: 'Отчество',
            },
        },
        {
            id: 'dolgnost',
            type: 'text',
            options: {
                placeholder: 'Должность',
            },
        },
        {
            id: 'education',
            type: 'text',
            options: {
                placeholder: 'Образование',
            },
        },
        {
            id: 'udo',
            type: 'text',
            options: {
                placeholder: 'Удостоверение',
            },
        },
        {
            id: 'category',
            type: 'text',
            options: {
                placeholder: 'Категория',
            },
        },
        {
            id: 'vodudo',
            type: 'text',
            options: {
                placeholder: 'Водительское удостоверение',
            },
        },
        {
            id: 'phone',
            type: 'text',
            options: {
                placeholder: 'Телефон',
            },
        },
    ];

    const openModalCreateTeacher = () => {
        PopupOpener.createModal({
            templateOptions: {
                bodyContent: <Menu data={data} />,
                width: 500,
                headerTitle: 'Добавление преподавателя',
            },
        });
    };

    return (
        <div className={classNames(['page__teacher', className])}>
            <div className="page__teacher_container">
                <div className="page__teacher_container__header">
                    <div className="page__teacher_container__header_title">
                        Преподавательский состав
                    </div>
                    <Button
                        icon={'plus'}
                        viewMode={'icon'}
                        iconSize={'m'}
                        onClick={openModalCreateTeacher}
                    />
                </div>
                <div className="page__teacher_list__header">
                    <div>ФИО</div>
                    <div>Номер телефона</div>
                </div>
                <View
                    source={source}
                    canSelected={false}
                    horizontalPaddings={'xs'}
                    templateItem={(item: TeacherModel) => (
                        <div className={'page__teacher_list__item'}>
                            <div className="page__teacher_list__item_photo">
                                {item.surname[0]}
                                {item.name[0]}
                            </div>
                            <div className="page__teacher_list__item_info">
                                <div className="page__teacher_list__item_info_name">
                                    {item.FullName}
                                </div>
                                <div className="page__teacher_list__item_info_job">
                                    {item.job}
                                </div>
                            </div>
                            <div className="page__teacher_list__item_phone">
                                {item.PhoneNumber}
                            </div>
                        </div>
                    )}
                />
            </div>
        </div>
    );
};

export default Page;
