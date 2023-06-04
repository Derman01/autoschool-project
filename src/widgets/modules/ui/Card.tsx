import { FC, useCallback, useState } from 'react';
import './styles/Card.scss';
import { ComponentOptions } from 'shared/types';
import { classNames } from 'shared/lib/helpers';
import { ModuleModel } from '../models/Model';
import { Button } from 'shared/ui/buttons';
import { editModule } from './helper/editModule';
import { Info } from 'shared/ui/form';
import { usePopupContext } from 'shared/hooks/usePopupContext';
import { deleteModule } from 'widgets/modules/ui/helper/deleteModule';
import items from 'shared/ui/_list/Items';

interface CardOptions extends ComponentOptions {
    module: ModuleModel;
    afterUpdate: () => Promise<void>;
}

export const Card: FC<CardOptions> = (options) => {
    const { className, afterUpdate } = options;
    const [module, setModule] = useState(options.module);
    const { closePopup } = usePopupContext();

    const onEditHandler = useCallback(() => {
        editModule(module, (item: ModuleModel) => {
            setModule(
                new ModuleModel({
                    ...module,
                    ...item,
                })
            );
            return afterUpdate();
        });
    }, [module]);

    const onDeleteHandler = useCallback(() => {
        deleteModule(module).then(() => {
            afterUpdate().then(() => {
                closePopup();
            });
        });
    }, [module]);

    return (
        <div className={classNames(['widget-module__Card', className])}>
            <Info
                data={[
                    {
                        title: 'Название',
                        value: module.name,
                    },
                    {
                        title: 'Описание',
                        value: (
                            <>
                                {module.Description.map((row, index) => (
                                    <span key={index}>
                                        {row}
                                        <br />
                                    </span>
                                ))}
                            </>
                        ),
                    },
                    {
                        title: 'Ак. часы',
                        value: module.Hours + '',
                    },
                ]}
            />
            <div className="widget-module__Card_actions">
                <Button
                    style={'primary'}
                    title={'Редактировать'}
                    onClick={onEditHandler}
                />
                {module.metadata === 'module' && (
                    <Button
                        style={'danger'}
                        title={'Удалить'}
                        onClick={onDeleteHandler}
                    />
                )}
            </div>
        </div>
    );
};
