import { FC, useRef } from 'react';
import './styles/Page.scss';
import { ComponentOptions } from 'shared/types';
import { classNames } from 'shared/lib/helpers';
import { IViewRef, RichView } from 'shared/ui/list';
import { MODULE_DATA_FORM, MODULE_SOURCE } from './Constants';
import { Actions } from 'widgets/action';
import { createData, deleteData, editData } from 'shared/lib/action';

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
            <RichView
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
                listOptions={{
                    source: MODULE_SOURCE,
                    actions,
                }}
            />
        </div>
    );
};

export default Page;