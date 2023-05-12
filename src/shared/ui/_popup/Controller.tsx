import { FC, useEffect } from 'react';
import { ComponentOptions } from 'shared/types';
import { classNames } from 'shared/lib/helpers';
import { PopupConfig, usePopup } from 'shared/hooks/usePopup';
import { useCommand } from 'shared/hooks/useCommand';

interface ControllerOptions extends ComponentOptions {}

export const Controller: FC<ControllerOptions> = (options) => {
    const { className } = options;

    const popups = usePopup((state) => state.popups);
    const openPopup = usePopup((state) => state.openPopup);
    const closePopup = usePopup((state) => state.closePopup);

    useEffect(() => {
        const sub = [
            useCommand.subscribe('openPopup', (config: PopupConfig) => {
                openPopup(config);
            }),
            useCommand.subscribe('closePopup', (id: string) => {
                closePopup(id);
            }),
        ];

        return () => {
            sub.forEach((id) => {
                useCommand.unsubscribe(id);
            });
        };
    }, []);

    return (
        <div className={classNames(['PopupController', className])}>
            {popups.map(({ id, Popup }) => (
                <Popup key={id} />
            ))}
        </div>
    );
};

export const closePopup = (id: string) => {
    useCommand.sendCommand('closePopup', id);
};
