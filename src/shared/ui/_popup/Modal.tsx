import { FC } from 'react';
import './styles/Modal.scss';
import { classNames } from 'shared/lib/helpers';
import { Button } from 'shared/ui/buttons';
import { Container } from './Container';
import { ModalOptions } from './Interface';
import { closePopup } from './Controller';

export const Modal: FC<ModalOptions> = (options) => {
    const { className, width = 300, headerTitle, bodyContent, id } = options;

    return (
        <Container>
            <div
                className={classNames(['Modal', className])}
                style={{ minWidth: width + 'px' }}
            >
                <div className="Modal__content">
                    <div className="Modal__header">
                        <div className="Modal__header_title">{headerTitle}</div>
                        <Button
                            iconSize={'m'}
                            icon={'close'}
                            viewMode={'icon'}
                            onClick={() => closePopup(id)}
                        />
                    </div>
                    <div className="Modal__body">{bodyContent}</div>
                </div>
            </div>
        </Container>
    );
};
