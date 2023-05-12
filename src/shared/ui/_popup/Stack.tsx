import { FC } from 'react';
import './styles/Stack.scss';
import { Container } from './Container';
import { StackOptions } from './Interface';
import { classNames } from 'shared/lib/helpers';
import { Button } from 'shared/ui/buttons';
import { usePopup } from 'shared/hooks/usePopup';

export const Stack: FC<StackOptions> = (options) => {
    const { className, headerTitle, bodyContent, width = 500, id } = options;
    const closePopup = usePopup((state) => state.closePopup);

    const closeStack = (): void => {
        closePopup(id);
    };

    return (
        <Container>
            <div
                className={classNames(['Stack', className])}
                style={{ width: width + 'px' }}
            >
                <div className={classNames('Stack__content')}>
                    <div className={classNames('Stack__header')}>
                        {headerTitle && (
                            <div className={classNames('Stack__header_title')}>
                                {headerTitle}
                            </div>
                        )}
                    </div>
                    <div className={classNames('Stack__body')}>
                        {bodyContent}
                    </div>
                </div>
                <div className={classNames('Stack__aside')}>
                    <div className={classNames('Stack__closeButton_container')}>
                        <Button
                            viewMode={'icon'}
                            icon={'close'}
                            iconSize={'s'}
                            onClick={closeStack}
                        />
                    </div>
                    <div className={classNames('Stack__aside_container')}></div>
                </div>
            </div>
        </Container>
    );
};
