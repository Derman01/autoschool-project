import { FC, useCallback, useState } from 'react';
import './styles/Card.scss';
import { ComponentOptions } from 'shared/types';
import { classNames } from 'shared/lib/helpers';
import { GroupModel } from '../models/Model';
import { Button } from 'shared/ui/buttons';
import { Info } from 'shared/ui/form';
import { usePopupContext } from 'shared/hooks/usePopupContext';
import { deleteGroup } from './helper/deleteGroup';
import { editGroup } from './helper/editGroup';

interface CardOptions extends ComponentOptions {
    group: GroupModel;
    afterUpdate: () => Promise<void>;
}

export const Card: FC<CardOptions> = (options) => {
    const { className, afterUpdate } = options;
    const [groupModel, setGroupModel] = useState(options.group);
    const { closePopup } = usePopupContext();

    const onEditHandler = useCallback(() => {
        editGroup(groupModel, (item: GroupModel) => {
            setGroupModel(
                (module) =>
                    new GroupModel({
                        ...module,
                        ...item,
                    })
            );
            return afterUpdate();
        });
    }, [groupModel]);

    const onDeleteHandler = useCallback(() => {
        deleteGroup(groupModel).then(() => {
            afterUpdate().then(() => {
                closePopup();
            });
        });
    }, [groupModel]);

    return (
        <div className={classNames(['widget-module__Card', className])}>
            <Info
                data={[
                    {
                        title: 'Название группы',
                        value: groupModel.title,
                    },
                    {
                        title: 'Категория обучения',
                        value: groupModel.category_name,
                    },
                    {
                        title: 'Дата начала обучения',
                        value: groupModel.StartDate,
                    },
                    {
                        title: 'Дата окончания обучения',
                        value: groupModel.EndDate,
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
