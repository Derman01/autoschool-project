import { FC, useRef } from 'react';
import './styles/Modal.scss';
import { Menu, MenuRef, TDataForm } from './Menu';
import { classNames } from 'shared/lib/helpers';
import { ComponentOptions } from 'shared/types';
import { Button } from 'shared/ui/buttons';
import { closePopup, PopupOpener, PopupOptions } from 'shared/ui/popup';

interface IModalProps extends ComponentOptions {
    data: TDataForm;
    onResult: (data: object) => void;
    popupConfig: { id: string };
}
const Modal: FC<IModalProps> = (props) => {
    const { data, className, onResult, popupConfig } = props;

    const menuRef = useRef<MenuRef>(null);

    const close = () => {
        closePopup(popupConfig.id);
    };

    const onAddClickHandler = () => {
        onResult(menuRef.current.getData());
        close();
    };

    return (
        <div className={classNames(['form-Popup', className])}>
            <Menu data={data} ref={menuRef} />
            <div className={'form-Popup__buttons'}>
                <Button onClick={onAddClickHandler} title={'Добавить'} />
                <Button style={'unaccented'} onClick={close} title={'Отмена'} />
            </div>
        </div>
    );
};

export const OpenForm = (
    popupOptions: Omit<PopupOptions, 'bodyContent' | 'id'>,
    props: Omit<IModalProps, 'popupConfig'>
) => {
    const popupConfig = {
        id: '',
    };
    popupConfig.id = PopupOpener.createModal({
        templateOptions: {
            headerTitle: popupOptions.headerTitle,
            width: popupOptions.width,
            bodyContent: <Modal {...props} popupConfig={popupConfig} />,
        },
    }).id;
};
