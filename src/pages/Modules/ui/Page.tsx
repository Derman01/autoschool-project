import { FC, useRef } from 'react';
import './styles/Page.scss';
import { ComponentOptions } from 'shared/types';
import { classNames } from 'shared/lib/helpers';
import { IViewRef, RichGrid } from 'shared/ui/list';
import { MODULE_DATA_FORM, MODULE_SOURCE } from './Constants';
import { Actions } from 'widgets/action';
import { createData, deleteData, editData } from 'shared/lib/action';
import { ModuleModel } from '../model/Model';

interface PageOptions extends ComponentOptions {}

const Page: FC<PageOptions> = (options) => {
    const { className } = options;
    const listRef = useRef<IViewRef>();

    const actions: Actions = [
        {
            id: 'edit',
            title: 'Редактировать',
            handler: (item) => {
                return editData(
                    {
                        source: MODULE_SOURCE,
                        data: item,
                        modelDataForm: MODULE_DATA_FORM,
                    },
                    listRef.current.reload
                );
            },
        },
        {
            id: 'delete',
            title: 'Удалить',
            handler: (item) => {
                return deleteData(MODULE_SOURCE, {
                    id: item.id,
                }).then(listRef.current.reload);
            },
        },
    ];

    return (
        <div className={classNames(['pages-Modules__page', className])}>
            <RichGrid
                ref={listRef}
                headerTitle={'Модули'}
                addingCallback={() => {
                    createData(
                        {
                            source: MODULE_SOURCE,
                            modelDataForm: MODULE_DATA_FORM,
                            headerTitle: 'Добавить модуль',
                        },
                        listRef.current.reload
                    );
                }}
                gridOptions={{
                    source: MODULE_SOURCE,
                    actions,
                    captions: [
                        {
                            title: 'Название',
                            width: '1fr',
                        },
                        {
                            title: 'Описание',
                            width: '1fr',
                        },
                    ],
                    columns: [
                        (props: ModuleModel) => <>{props.name}</>,
                        (props: ModuleModel) => (
                            <>
                                {props.description
                                    .split('\n')
                                    .map((row: string, index: number) => (
                                        <span key={index}>
                                            {row}
                                            <br />
                                        </span>
                                    ))}
                            </>
                        ),
                    ],
                }}
            />
        </div>
    );
};

export default Page;
