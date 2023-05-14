import { FC, ReactNode } from 'react';
import './styles/Container.scss';
import { classNames } from 'shared/lib/helpers';
import { Button } from 'shared/ui/buttons';
import { ComponentOptions } from 'shared/types';

interface ContainerOptions extends ComponentOptions {
    contrastBackground?: boolean;
    headerTitle: string;
    addingCallback: () => void;
    children?: ReactNode;
}

export const Container: FC<ContainerOptions> = (options) => {
    const {
        className,
        headerTitle,
        addingCallback,
        children,
        contrastBackground = true,
    } = options;

    return (
        <div
            className={classNames(['list__container', className], {
                contrastBackground,
            })}
        >
            <div className="list__container_header">
                <div className="list__container_header_title">
                    {headerTitle}
                </div>
                <Button
                    icon={'plus'}
                    viewMode={'icon'}
                    iconSize={'m'}
                    onClick={addingCallback}
                />
            </div>
            {children}
        </div>
    );
};
