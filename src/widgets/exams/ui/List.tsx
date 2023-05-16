import { FC, useRef } from 'react';
import './styles/List.scss';
import { IViewRef, RichGrid } from 'shared/ui/list';
import { Actions } from 'widgets/action';
import { EXAM_SOURCE } from './helper/Constants';
import { create } from './helper/create';
import { edit } from './helper/edit';
import { deleteExam } from './helper/deleteExam';
import { ExamsModel } from 'widgets/exams';

interface IListExamProps {
    studentId: string;
    dataLoadCallback?: (items: any[]) => void;
    selectedChanged?: (item: any) => void;
}

export const ListExam: FC<IListExamProps> = (props) => {
    const { dataLoadCallback, selectedChanged, studentId } = props;
    const listRef = useRef<IViewRef>();

    const actions: Actions = [
        {
            id: 'edit',
            title: 'Редактировать',
            handler: (item) => {
                return edit(item, listRef.current.reload);
            },
        },
        {
            id: 'delete',
            title: 'Удалить',
            handler: (item) => {
                return deleteExam({
                    id: item['id'],
                }).then(() => {
                    return listRef.current.reload();
                });
            },
        },
    ];

    return (
        <RichGrid
            contrastBackground={false}
            ref={listRef}
            headerTitle={'Экзамены'}
            addingCallback={() => create(studentId, listRef.current.reload)}
            gridOptions={{
                filter: {
                    student: studentId,
                },
                source: EXAM_SOURCE,
                canSelected: true,
                actions,
                autoSelected: true,
                style: 'list',
                dataLoadCallback,
                selectedChanged,
                keyProperty: 'id',
                captions: [
                    {
                        title: 'Название',
                        width: '3fr',
                    },
                    {
                        title: 'Дата',
                        width: '1fr',
                    },
                    {
                        title: 'Оценка',
                        width: '1fr',
                    },
                ],
                columns: [
                    (props: ExamsModel) => <>{props.name}</>,
                    (props: ExamsModel) => <>{props.date}</>,
                    (props: ExamsModel) => <>{props.mark}</>,
                ],
            }}
        />
    );
};
