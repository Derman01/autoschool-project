import { FC } from 'react';
import './styles/Modal.scss';
import {classNames} from 'shared/lib/helpers';
import { Button } from 'shared/ui/buttons';
import { usePopup } from 'shared/hooks/usePopup';
import { Container } from './Container';
import { ModalOptions } from './Interface';

export const Modal: FC<ModalOptions> = (options) => {
    const {
		className,
		width = 300,
		headerTitle,
		bodyContent,
		id
	} = options;

	const closePopup = usePopup(state => state.closePopup)

	const closeModal = (): void => {
		closePopup(id);
	}

    return (
		<Container>
			<div className={classNames(['Modal', className])}
				 style={{width: width + 'px'}}
			>
				<div className="Modal__content">
					<div className="Modal__header">
						<div className="Modal__header_title">{headerTitle}</div>
						<Button iconSize={'m'} icon={'close'} onClick={closeModal}/>
					</div>
					<div className="Modal__body">
						{bodyContent}
					</div>
				</div>
			</div>
		</Container>
    );
};