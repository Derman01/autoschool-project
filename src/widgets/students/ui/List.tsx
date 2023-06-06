import { FC, ReactElement, useRef } from 'react';
import './styles/List.scss';
import { ComponentOptions } from 'shared/types';
import { IViewRef, RichGrid } from 'shared/ui/list';
import { STUDENT_SOURCE } from './Constants';
import { createStudent, deleteStudent, editStudent } from './helper';
import { StudentModel } from '../models/Model';
import { Actions } from 'widgets/action';
import { downloadFile } from 'shared/lib/source';
import { PopupOpener } from 'shared/ui/popup';
import { PaymentList } from 'widgets/payments';
import { ListExam } from 'widgets/exams';
import { classNames } from 'shared/lib/helpers';
import { Card } from './Card';

export interface IFilter {
    group?: string;
}

export interface ListOptions extends ComponentOptions {
    filter?: IFilter;
    headerTitle?: ReactElement | string;
}

const CAPTION = [
    { title: 'ФИО', width: '3fr' },
    {
        title: 'Оплаченно',
        width: '1fr',
    },
];

const COLUMNS: ((student: StudentModel) => ReactElement)[] = [
    (student) => (
        <div style={{ display: 'flex', gap: '12px' }}>
            <div className="page__students_detail__item_photo">
                {student.name[0] + student.surname[0]}
            </div>
            <div className="page__students_detail__item_info">
                <span className={'page__students_detail__item_infoName'}>
                    {student.getFullName}
                </span>
                <span className={'page__students_detail__item_infoGroup'}>
                    {student.group_name}
                </span>
            </div>
        </div>
    ),
    (student) => (
        <div className={classNames('student_item__payment')}>
            {student.payment}
        </div>
    ),
];

export const List: FC<ListOptions> = (options) => {
    const { className, filter, headerTitle } = options;

    const ref = useRef<IViewRef>();

    const actions: Actions = [
        {
            id: 'edit',
            title: 'Редактировать',
            handler: (item) => {
                return editStudent(item, ref.current.reload);
            },
        },
        {
            id: 'delete',
            title: 'Удалить',
            handler: (item) => {
                return deleteStudent({
                    studentId: item['id'],
                    groupId: item['group_id'],
                }).then(() => {
                    return ref.current.reload();
                });
            },
        },
        {
            id: 'payments',
            title: 'Открыть платежи',
            handler: (item: StudentModel) => {
                PopupOpener.createModal({
                    templateOptions: {
                        width: 1000,
                        headerTitle: 'Платежи студента ' + item.ShortName,
                        bodyContent: (
                            <PaymentList
                                filter={{
                                    student_id: item.id,
                                }}
                            />
                        ),
                    },
                });
                return Promise.resolve();
            },
        },
        {
            id: 'exams',
            title: 'Открыть список экзаменов',
            handler: (item: StudentModel) => {
                PopupOpener.createModal({
                    templateOptions: {
                        width: 1000,
                        headerTitle: 'Экзамены студента ' + item.ShortName,
                        bodyContent: <ListExam studentId={item.id} />,
                    },
                });
                return Promise.resolve();
            },
        },
        {
            id: 'print',
            title: 'Распечатать документ',
            children: [
                {
                    id: 'print-0',
                    title: 'Карточка учета вождения автомобиля',
                    handler: (item) => {
                        downloadFile('car-driving-registration-card', {
                            student_id: item.id,
                        });
                        return Promise.resolve();
                    },
                },
                {
                    id: 'print-1',
                    title: 'Экзаменационная карточка водителя',
                    handler: (item) => {
                        downloadFile('driver-exam-card', {
                            student_id: item.id,
                        });
                        return Promise.resolve();
                    },
                },
                {
                    id: 'print-2',
                    title: 'Акт на оказание услуг',
                    handler: (item) => {
                        downloadFile('service-delivery-act', {
                            student_id: item.id,
                        });
                        return Promise.resolve();
                    },
                },
                {
                    id: 'print-3',
                    title: 'Акт о выполнении услуги',
                    handler: (item) => {
                        downloadFile('service-performance-act', {
                            student_id: item.id,
                        });
                        return Promise.resolve();
                    },
                },
                {
                    id: 'print-4',
                    title: 'Путевой лист',
                    handler: (item) => {
                        downloadFile('waybill', {
                            student_id: item.id,
                        });
                        return Promise.resolve();
                    },
                },
                {
                    id: 'print-5',
                    title: 'Заявление в ГИБДД на получение прав',
                    handler: (item) => {
                        downloadFile('driver-license-application', {
                            student_id: item.id,
                        });
                        return Promise.resolve();
                    },
                },
                {
                    id: 'print-6',
                    title: 'Экзаменационный протокол',
                    handler: (item) => {
                        downloadFile('exam-protocol', {
                            student_id: item.id,
                        });
                        return Promise.resolve();
                    },
                },
            ],
        },
    ];

    const openCard = (item: StudentModel) => {
        PopupOpener.createModal({
            templateOptions: {
                headerTitle: 'Карточка студента',
                bodyContent: (
                    <Card student={item} afterUpdate={ref.current.reload} />
                ),
            },
        });
    };

    return (
        <RichGrid
            ref={ref}
            className={className}
            headerTitle={headerTitle}
            addingCallback={() => createStudent(ref.current.reload)}
            gridOptions={{
                actions,
                filter,
                selectedChanged: openCard,
                source: STUDENT_SOURCE,
                captions: CAPTION,
                columns: COLUMNS,
            }}
        />
    );
};
