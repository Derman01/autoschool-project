import { FC } from 'react';
import { ComponentOptions } from 'shared/types';
import { classNames } from 'shared/lib/helpers';
import { usePopup } from 'shared/hooks/usePopup';

interface ControllerOptions extends ComponentOptions {
}

export const Controller: FC<ControllerOptions> = (options) => {
    const {
		className
	} = options;

	const popups = usePopup(state => state.popups);

    return (
        <div className={classNames(['PopupController', className])}>
			{
				popups.map(({id, Popup}) => <Popup key={id}/>)
			}
        </div>
    );
};