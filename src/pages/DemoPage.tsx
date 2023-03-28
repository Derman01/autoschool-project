import {FC} from 'react';
import {ComponentOptions} from 'shared/types';
import {classNames} from 'shared/lib/helpers';
import { PopupOpener } from 'shared/ui/_popup/PopupOpener';
import { usePopup } from 'shared/hooks/usePopup';

interface DemoPageOptions extends ComponentOptions {
}

export const DemoPage: FC<DemoPageOptions> = (options) => {
    const {className} = options;
	const openPopup = usePopup(state => state.openPopup);
	const openPopupStack = () => {
		const stack = PopupOpener.createStack({
			templateOptions: {
				headerTitle: 'Создание карточки студента',
				bodyContent: <div>Карточка Студента</div>
			}
		});
		openPopup({
			id: stack.id,
			Popup: stack.Popup
		});
	};

    return (

        <div className={classNames(['DemoPage', className])}>
            <button onClick={openPopupStack}>Открыть стековое окно</button>
        </div>
    );
};