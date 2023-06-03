import { FC, useRef } from 'react';
import './styles/List.scss';
import { Caption, IViewRef, RichGrid } from 'shared/ui/list';
import { Actions } from 'widgets/action';
import { MODULE_SOURCE } from './helper/Constants';
import { createModule } from './helper/createModule';
import { ModuleModel } from '../models/Model';

interface IListModulesProps {
    dataLoadCallback?: (items: any[]) => void;
    selectedChanged?: (item: any) => void;
}

const COLUMNS: FC<ModuleModel>[] = [
    (props) => <>{props.title}</>,
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

    const actions: Actions = [
        {
            id: 'create',
            title: '',
        },
    ];

    return (
        <RichGrid
            ref={listRef}
            headerTitle={'Модули'}
            addingCallback={() => createModule(listRef.current.reload)}
            gridOptions={{
                source: MODULE_SOURCE,
                canSelected: false,
                autoSelected: true,
                columns: COLUMNS,
                captions: CAPTION,
            }}
        />
    );
};
