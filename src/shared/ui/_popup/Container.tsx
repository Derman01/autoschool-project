import { FC, ReactNode } from 'react';
import './styles/StackContainer.scss'
import { ComponentOptions } from 'shared/types';
import { classNames } from 'shared/lib/helpers';

interface ContainerOptions extends ComponentOptions {
	children: ReactNode;
}

/**
 * @description Оберточный компонент для отдельного Popup элемента
 */
export const Container: FC<ContainerOptions> = (options) => {
    const {
		className,
		children,
	} = options;

    return (
        <div className={classNames(['StackContainer', className])}>
			{
				children
			}
        </div>
    );
};