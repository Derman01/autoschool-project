import { FC, useRef } from 'react';
import './styles/List.scss';
import { Caption, IViewRef, RichGrid } from 'shared/ui/list';
import { MODULE_SOURCE } from './helper/Constants';
import { createModule } from './helper/createModule';
import { ModuleModel } from '../models/Model';
import { PopupOpener } from 'shared/ui/popup';
import { Card } from './Card';

interface IListModulesProps {
    dataLoadCallback?: (items: any[]) => void;
    selectedChanged?: (item: any) => void;
}

const COLUMNS: FC<ModuleModel>[] = [
    (props) => <>{props.name}</>,
    (props) => <>{props.Hours}</>,
];

const CAPTION: Caption[] = [
    {
        title: 'Название',
        width: '4fr',
    },
    {
        title: 'Академ. часы',
        width: '1fr',
    },
];

export const ListModules: FC<IListModulesProps> = () => {
    const listRef = useRef<IViewRef>();

    const openCard = (module: ModuleModel) => {
        PopupOpener.createModal({
            templateOptions: {
                headerTitle: 'Карточка модуля',
                bodyContent: (
                    <Card
                        module={module}
                        afterUpdate={listRef.current.reload}
                    />
                ),
            },
        });
    };

    return (
        <RichGrid
            ref={listRef}
            headerTitle={'Модули'}
            addingCallback={() => createModule(listRef.current.reload)}
            gridOptions={{
                source: MODULE_SOURCE,
                selectedChanged: openCard,
                canSelected: false,
                filter: {
                    exams: false,
                },
                autoSelected: true,
                columns: COLUMNS,
                captions: CAPTION,
            }}
        />
    );
};
