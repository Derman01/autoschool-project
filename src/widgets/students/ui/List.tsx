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
import { GroupModel } from 'widgets/groups';

export interface IFilter {
    group?: string;
}

export interface ListOptions extends ComponentOptions {
    filter?: IFilter;
    headerTitle?: ReactElement | string;
    group?: GroupModel;
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
    const { className, filter, headerTitle, group } = options;

    const ref = useRef<IViewRef>();

    const openCard = (item: StudentModel) => {
        PopupOpener.createModal({
            templateOptions: {
                width: 1000,
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
            addingCallback={() => createStudent(group, ref.current.reload)}
            gridOptions={{
                filter,
                selectedChanged: openCard,
                source: STUDENT_SOURCE,
                captions: CAPTION,
                columns: COLUMNS,
            }}
        />
    );
};
