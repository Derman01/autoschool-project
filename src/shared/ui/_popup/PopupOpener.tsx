import { nanoid } from 'nanoid';
import { PopupOpenerOptions, PopupOptions } from './Interface';
import { Stack } from 'shared/ui/_popup/Stack';
import { PopupConfig } from 'shared/hooks/usePopup';
import { Modal } from 'shared/ui/_popup/Modal';
import { FC } from 'react';


export class PopupOpener {

	private static createPopup(options: PopupOpenerOptions, Popup: FC<PopupOptions>) {
		const id = nanoid();
		return {
			id,
			Popup: () => <Popup id={id} {...options.templateOptions}/>
		}
	}

	static createStack(options: PopupOpenerOptions): PopupConfig {
		return PopupOpener.createPopup(options, Stack)
	}

	static createModal(options: PopupOpenerOptions): PopupConfig {
		return PopupOpener.createPopup(options, Modal)
	}
}